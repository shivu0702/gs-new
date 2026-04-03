import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

// GET Wishlist for a user
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    
    if (!email) return NextResponse.json({ message: "Email required" }, { status: 400 });

    const db = await getDB();
    const [rows] = await db.query(`
      SELECT p.*, w.id as wishlist_id 
      FROM wishlists w 
      JOIN products p ON w.product_id = p.id 
      WHERE w.user_email = ?
    `, [email]);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("WISHLIST GET ERROR:", error);
    return NextResponse.json({ message: "Error fetching wishlist" }, { status: 500 });
  }
}

// POST Add to wishlist
export async function POST(req: Request) {
  try {
    const { email, product_id } = await req.json();
    
    if (!email || !product_id) return NextResponse.json({ message: "Email and Product ID required" }, { status: 400 });

    const db = await getDB();
    
    // ignore duplicate
    await db.query(`
      INSERT IGNORE INTO wishlists (user_email, product_id)
      VALUES (?, ?)
    `, [email, product_id]);

    return NextResponse.json({ message: "Added to wishlist" });
  } catch (error) {
    console.error("WISHLIST POST ERROR:", error);
    return NextResponse.json({ message: "Error adding to wishlist" }, { status: 500 });
  }
}

// DELETE from wishlist
export async function DELETE(req: Request) {
  try {
    const { email, product_id } = await req.json();
    
    if (!email || !product_id) return NextResponse.json({ message: "Email and Product ID required" }, { status: 400 });

    const db = await getDB();
    
    await db.query(`
      DELETE FROM wishlists WHERE user_email = ? AND product_id = ?
    `, [email, product_id]);

    return NextResponse.json({ message: "Removed from wishlist" });
  } catch (error) {
    console.error("WISHLIST DELETE ERROR:", error);
    return NextResponse.json({ message: "Error removing from wishlist" }, { status: 500 });
  }
}
