import { getDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const db = await getDB();

  	const body = await req.json();
  	const { name, email, message } = body;

  	await db.execute(
  	  "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)",
  	  [name, email, message]
  	  );

  	 return NextResponse.json({ message: "Message Saved" });


 } catch (error) {
 	console.log("CONTACT ERROR:", error);
 	return NextResponse.json({ message: "Error" }, { status: 500 });
 }
}