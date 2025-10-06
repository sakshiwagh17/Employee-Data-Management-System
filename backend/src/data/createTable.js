import pool from "../config/db.js";

export const createEmployeeTable = async (req, res) => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS employee(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    position VARCHAR(100) NOT NULL ,
    created_at TIMESTAMP DEFAULT NOW()
)
    `;
  try {
    pool.query(queryText);
    console.log("Employee table created successfully!");
  } catch (error) {
    console.log("Error in creating the table: ", error);
  }
};
