import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
});

pool.on("connect", () => {
  console.log("Connection pool is established to database ");
});

pool.on("error", (err) => {
  console.log("Unexpected DB error", err);
  process.exit(-1);
});

export default pool;
