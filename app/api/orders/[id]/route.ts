import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const db = await getDB();
    const resolvedParams = await params;
    const orderId = resolvedParams.id;
    
    // Fetch total order
    const [orders]: any = await db.query(
      "SELECT * FROM orders WHERE id = ?", [orderId]
    );

    if (orders.length === 0) return NextResponse.json({ message: "Order not found" }, { status: 404 });
    const order = orders[0];

    // Fetch order items
    const [items]: any = await db.query(
      "SELECT * FROM order_items WHERE order_id = ?", [order.id]
    );
    order.items = items;

    // Fetch user details for invoice delivery info
    const [users]: any = await db.query("SELECT name, email FROM users WHERE email = ?", [order.user_email]);
    order.user = users[0];

    return NextResponse.json(order);
  } catch (error) {
    console.error("GET ORDER ERROR:", error);
    return NextResponse.json({ message: "Error fetching order" }, { status: 500 });
  }
}
