const mysql = require("mysql2/promise");

async function fix() {
  try {
    const db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "gs_enterprises",
    });

    console.log("Checking order_items table for missing 'image' column...");
    try {
      await db.query("ALTER TABLE order_items ADD COLUMN image VARCHAR(255) NOT NULL DEFAULT '/default.jpg'");
      console.log("✅ Added column 'image' to order_items.");
    } catch (err) {
      if (err.code === "ER_DUP_FIELDNAME") {
        console.log("✅ Column 'image' already exists in order_items.");
      } else {
        console.error("Error adding column:", err.message);
      }
    }

    process.exit(0);
  } catch (err) {
    console.error("Fatal Error:", err);
    process.exit(1);
  }
}

fix();
