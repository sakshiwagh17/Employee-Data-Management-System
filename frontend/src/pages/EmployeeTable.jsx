import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../lib/axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EmployeeTable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchName = new URLSearchParams(location.search);
  const searchTerm = searchName.get("name");

  const fetchData = async () => {
    setIsLoading(true);
    try {
      let url = "/employee";
      if (searchTerm) {
        url = `/employee?name=${searchTerm}`;
      }
      const res = await axios.get(url);

      setEmployees(res.data.data);
    } catch (error) {
      console.log("Failed to fetch employees:", error);
      toast.error("Failed to load employee data.");
      setEmployees([]); // clear employees on error
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Employee?"))
      return;
    try {
      await axios.delete(`/employee/${id}`);
      toast.warn("Employee record deleted.");
      fetchData();
    } catch (error) {
      console.log("Failed to delete employee:", error);
      toast.error("Failed to delete employee!");
    }
  };
  useEffect(() => {
    fetchData();
  }, [location.search]);
  if (isLoading) {
    return (
      <div className="p-10 text-center text-lg text-green-700">
        Loading employees
      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold text-gray-600">
          No Employees Found.
        </h2>
        <button
          onClick={() => navigate("/addemployee")}
          className="mt-4 bg-green-700 text-white rounded-xl px-4 py-2 hover:bg-green-800 transition"
        >
          Add Employee
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-50 to-yellow-50 p-10">
      {/* Title */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Employee List</h2>
        <button
          onClick={() => navigate("/addemployee")}
          className="bg-green-700 text-white rounded-xl px-4 py-2 hover:bg-green-800 transition"
        >
          Add Employee
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-indigo-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Sr. No
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Position
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr
                key={emp.id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-indigo-50 transition`}
              >
                <td className="px-6 py-3 text-sm text-gray-800">{index + 1}</td>
                <td className="px-6 py-3 text-sm text-gray-800">{emp.name}</td>
                <td className="px-6 py-3 text-sm text-gray-800">{emp.email}</td>
                <td className="px-6 py-3 text-sm text-gray-800">
                  {emp.position}
                </td>
                <td className="px-6 py-3 text-sm text-gray-800 flex gap-3">
                  <button
                    onClick={() => handleDelete(emp.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <MdDelete size={20} />
                  </button>
                  <button
                    onClick={() => navigate(`/editEmployee/${emp.id}`)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
