import React from "react";
import Navbar from "./components/Navbar";
import EmployeeTable from "./pages/EmployeeTable.jsx";
import { Route, Routes } from "react-router-dom";
import {ToastContainer} from "react-toastify";
import EditEmployee from "./pages/EditEmployee.jsx";
import AddEmployee from "./pages/AddEmployee.jsx";
const App = () => {
  return (
    <div>
      <Navbar />
      <ToastContainer  position="top-right" autoClose={3000}  />
      <Routes>
        <Route path="/" element={<EmployeeTable />} />
         <Route path="/employee" element={<EmployeeTable />} /> 
        <Route path="/addemployee" element={<AddEmployee/>} />
        <Route path="/editEmployee/:id" element={<EditEmployee />}/>
      </Routes>
    </div>
  );
};

export default App;
