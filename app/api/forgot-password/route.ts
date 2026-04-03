import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function PUT(req: Request) {
  try {
    const { email, newPassword } = await req.json();

    if (!email || !newPassword) {
      return NextResponse.json({ message: "Email and new password required" }, { status: 400 });
    }

    const db = await getDB();
    const [result]: any = await db.query(
      "UPDATE users SET password = ? WHERE email = ?", [newPassword, email]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "No user found with this email" }, { status: 404 });
    }

    return NextResponse.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
