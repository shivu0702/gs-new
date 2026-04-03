const mysql = require("mysql2/promise");

async function runMigrations() {
  try {
    const db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "gs_enterprises",
    });

    console.log("Running Database Migrations for E-Commerce Phase 2 Features...");

    // 1. Alter Users Table
    try {
      await db.query("ALTER TABLE users ADD COLUMN role VARCHAR(50) DEFAULT 'user'");
      console.log("✅ Added 'role' to users.");
    } catch(err) { if(err.code !== "ER_DUP_FIELDNAME") throw err; }

    // 2. Alter Orders Table
    try {
      await db.query("ALTER TABLE orders ADD COLUMN status VARCHAR(100) DEFAULT 'Pending'");
      console.log("✅ Added 'status' to orders.");
    } catch(err) { if(err.code !== "ER_DUP_FIELDNAME") throw err; }

    try {
      await db.query("ALTER TABLE orders ADD COLUMN total_amount DECIMAL(10, 2) DEFAULT 0");
      console.log("✅ Added 'total_amount' to orders.");
    } catch(err) { if(err.code !== "ER_DUP_FIELDNAME") throw err; }

    try {
      await db.query("ALTER TABLE orders ADD COLUMN payment_method VARCHAR(50) DEFAULT 'cod'");
      console.log("✅ Added 'payment_method' to orders.");
    } catch(err) { if(err.code !== "ER_DUP_FIELDNAME") throw err; }

    // 3. Create Wishlist Table
    await db.query(`
      CREATE TABLE IF NOT EXISTS wishlists (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_email VARCHAR(255) NOT NULL,
        product_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY user_product_unique (user_email, product_id)
      )
    `);
    console.log("✅ Created 'wishlists' table.");

    console.log("Migration Complete!");
    process.exit(0);
  } catch (err) {
    console.error("Migration Error:", err);
    process.exit(1);
  }
}

runMigrations();
