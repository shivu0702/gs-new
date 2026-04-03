import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    
    if (!email) return NextResponse.json({ message: "Email required" }, { status: 400 });

    const db = await getDB();
    
    // Fetch all orders
    const [orders]: any = await db.query(
      "SELECT * FROM orders WHERE user_email = ? ORDER BY created_at DESC", 
      [email]
    );

    // Fetch order items and attach them
    for (let order of orders) {
      const [items]: any = await db.query(
        "SELECT * FROM order_items WHERE order_id = ?", 
        [order.id]
      );
      order.items = items;
    }

    return NextResponse.json(orders);
  } catch (error) {
    console.error("ORDER HISTORY ERROR:", error);
    return NextResponse.json({ message: "Error fetching orders" }, { status: 500 });
  }
}
