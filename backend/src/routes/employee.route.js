import express from "express";
import {
  createEmployee,
  deleteEmployee,
  getAllEmployee,
  getEmployeeById,
  updateEmployee,
} from "../controllers/employee.controller.js";
import validateEmployee from "../middleware/inputValidator.js";

const employeeRoute = express.Router();

employeeRoute.post("/employee", validateEmployee, createEmployee);
employeeRoute.get("/employee", getAllEmployee);
employeeRoute.get("/employee/:id", getEmployeeById);
employeeRoute.put("/employee/:id", validateEmployee, updateEmployee);
employeeRoute.delete("/employee/:id", deleteEmployee);

export default employeeRoute;
