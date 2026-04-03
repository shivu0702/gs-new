import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const db = await getDB();
    
    const body = await req.json();
    const { email, cart } = body;

    console.log("EMAIL:", email);
    console.log("CART:", cart);

    const [result]: any = await db.execute(
      "INSERT INTO orders (user_email) VALUES (?)",
      [email]
    );

    const orderId = result.insertId;

    for (let item of cart) {
      await db.execute(
        "INSERT INTO order_items (order_id, product_name, price, image) VALUES (?, ?, ?, ?)",
        [orderId, item.name, item.price, item.image]
      );
    }

    return NextResponse.json({ message: "Order Placed" });

  } catch (error: any) {
    console.log("ORDER ERROR:", error);
    return NextResponse.json(
      { message: error?.message || "Unknown error" },
      { status: 500 }
    );
  }
}