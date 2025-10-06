// src/app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import errorHandling from "./middleware/errorHandling.js";
import { createEmployeeTable } from "./data/createTable.js";
import employeeRoute from "./routes/employee.route.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api", employeeRoute);

// Error handling middleware
app.use(errorHandling);

// Create table before handling requests
createEmployeeTable();

// Simple test route
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT current_database()");
    res.send(`The current database name is ${result.rows[0].current_database}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database query failed");
  }
});

export default app;
