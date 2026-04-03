import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    
    if (!email) return NextResponse.json({ message: "Email required" }, { status: 400 });

    const db = await getDB();
    const [rows]: any = await db.query(
      "SELECT id, name, email, role FROM users WHERE email = ?", [email]
    );

    if (rows.length === 0) return NextResponse.json({ message: "User not found" }, { status: 404 });
    return NextResponse.json(rows[0]);
    
  } catch (error) {
    console.error("PROFILE ERROR:", error);
    return NextResponse.json({ message: "Error fetching profile" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { originalEmail, email, name, role, password } = body;

    if (!originalEmail || !email) return NextResponse.json({ message: "Email fields required" }, { status: 400 });
    
    const db = await getDB();

    if (originalEmail !== email) {
      const [existing]: any = await db.query("SELECT id FROM users WHERE email = ?", [email]);
      if (existing.length > 0) return NextResponse.json({ message: "New email is already in use by another account" }, { status: 400 });
    }
    
    if (password) {
      await db.query("UPDATE users SET name = ?, password = ?, email = ?, role = ? WHERE email = ?", [name, password, email, role, originalEmail]);
    } else {
      await db.query("UPDATE users SET name = ?, email = ?, role = ? WHERE email = ?", [name, email, role, originalEmail]);
    }

    if (originalEmail !== email) {
      await db.query("UPDATE orders SET user_email = ? WHERE user_email = ?", [email, originalEmail]);
      await db.query("UPDATE wishlists SET user_email = ? WHERE user_email = ?", [email, originalEmail]);
    }

    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("PROFILE UPDATE ERROR:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
