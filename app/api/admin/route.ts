import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    
    const db = await getDB();
    const [user]: any = await db.query("SELECT role FROM users WHERE email = ?", [email]);
    
    if (user.length === 0 || user[0].role !== 'admin') {
       return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const [orders] = await db.query("SELECT * FROM orders ORDER BY created_at DESC");
    const [users] = await db.query("SELECT id, name, email FROM users");
    const [products] = await db.query("SELECT * FROM products");

    return NextResponse.json({ orders, users, products });
  } catch (error) {
    console.error("ADMIN GET ERROR:", error);
    return NextResponse.json({ message: "Error loading admin data" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { email, orderId, newStatus } = await req.json();
    
    const db = await getDB();
    const [user]: any = await db.query("SELECT role FROM users WHERE email = ?", [email]);
    
    if (user.length === 0 || user[0].role !== 'admin') {
       return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    await db.query("UPDATE orders SET status = ? WHERE id = ?", [newStatus, orderId]);
    return NextResponse.json({ message: "Status updated successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
