import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const db = await getDB();

    const body = await req.json();
    const { email, password } = body;

    const [rows]: any = await db.execute(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]
    );

    if (rows.length > 0) {
      return NextResponse.json({ message: "Login Success" });
    } else {
      return NextResponse.json({ message: "Invalid Credentials" }, { status: 401 });
    }
  } catch (error) {
    console.log("LOGIN ERROR:", error);
    return NextResponse.json({ message: "Error" }, { status: 500});
  }
}