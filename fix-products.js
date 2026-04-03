const mysql = require("mysql2/promise");

async function fix() {
  const c = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "gs_enterprises",
  });

  await c.execute("DELETE FROM products");

  await c.execute(
    `INSERT INTO products (name, price, image) VALUES 
      ('Laptop', 45999.00, 'laptop.jpg'),
      ('Headphones', 1999.00, 'headphones.jpg'),
      ('Phone', 29999.00, 'phone.jpg'),
      ('Camera', 34999.00, 'camera.jpg'),
      ('Smartwatch', 8999.00, 'smartwatch.jpg'),
      ('Speaker', 4999.00, 'speaker.jpg')`
  );

  const [rows] = await c.execute("SELECT * FROM products");
  console.log("Products now:", rows);
  process.exit(0);
}

fix();
