import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');
    
    const db = await getDB();
    
    if (!query) {
       const [rows] = await db.query("SELECT * FROM products");
       return NextResponse.json(rows);
    }
    
    const [rows] = await db.query("SELECT * FROM products WHERE name LIKE ?", [`%${query}%`]);
    return NextResponse.json(rows);
    
  } catch (error) {
    console.error("SEARCH ERROR:", error);
    return NextResponse.json({ message: "Error fetching products" }, { status: 500 });
  }
}
