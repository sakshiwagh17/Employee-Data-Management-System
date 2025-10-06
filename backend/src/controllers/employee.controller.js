import pool from "../config/db.js";

const handleResponse = async (res, status, message, data = null) => {
  res.status(status).json({ status, message, data });
};

//to create employee
export const createEmployee = async (req, res, next) => {
  const { name, email, position } = req.body;
  if ((!name, !email, !position)) {
    return handleResponse(res, 400, "All feilds are required!");
  }
  try {
    const newEmployee = await pool.query(
      "INSERT INTO employee(name,email,position) VALUES ($1,$2,$3) RETURNING *",
      [name, email, position]
    );

    handleResponse(
      res,
      201,
      "Employee created successfully",
      newEmployee.rows[0]
    );
  } catch (error) {
    next(error);
  }
};

//to get all
export const getAllEmployee = async (req, res, next) => {
  const { name } = req.query;
  try {
    let result;
    if (name) {
      result = await pool.query(
        "SELECT * FROM employee WHERE LOWER(name) LIKE LOWER($1)",
        [`%${name}%`]
      );
    } else {
      result = await pool.query("SELECT * FROM employee");
    }
    handleResponse(res, 200, "Employees fetched successfully", result.rows);
  } catch (error) {
    next(error);
  }
};

//to get by id
export const getEmployeeById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const employee = await pool.query("SELECT * FROM employee WHERE id=$1", [
      id,
    ]);
    if (employee.rows.length === 0) {
      return handleResponse(res, 404, "Employee not found");
    }
    handleResponse(res, 200, "Employee fetch successfully", employee.rows[0]);
  } catch (error) {
    next(error);
  }
};

//to delete
export const deleteEmployee = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedEmployee = await pool.query(
      "DELETE FROM employee WHERE id=$1 RETURNING *",
      [id]
    );
    if (deletedEmployee.rows.length === 0) {
      return handleResponse(res, 404, "Employee not found");
    }
    handleResponse(
      res,
      200,
      "Employee record deleted successfully",
      deletedEmployee.rows[0]
    );
  } catch (error) {
    next(error);
  }
};

//to update
export const updateEmployee = async (req, res, next) => {
  const { name, email, position } = req.body;
  const { id } = req.params;
  try {
    const updatedEmployee = await pool.query(
      "UPDATE employee SET name=$1, email=$2, position=$3 WHERE id=$4 RETURNING *",
      [name, email, position, id]
    );

    if (updatedEmployee.rows.length === 0) {
      return handleResponse(res, 404, "Employee not found");
    }
    handleResponse(
      res,
      200,
      "Employee record updated successfully",
      updatedEmployee.rows[0]
    );
  } catch (error) {
    next(error);
  }
};
