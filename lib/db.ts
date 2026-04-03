import mysql from "mysql2/promise";

let pool: mysql.Pool | null = null;

export async function getDB() {
  if (!pool) {
    pool = mysql.createPool({
      host: "localhost",
      user: "root",
      password: "",
      database: "gs_enterprises",
      waitForConnections: true,
      connectionLimit: 10,
      connectTimeout: 10000,
    });
  }
  return pool;
}