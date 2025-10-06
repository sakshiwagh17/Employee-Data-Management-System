import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    
    if (searchTerm.trim()) {
      // use encodeURIComponent to safely put the search term in the URL
      navigate(`/employee?name=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/');
    }
  };

  return (
    <header className="bg-green-50 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        <NavLink
          to="/"
          className="text-2xl font-bold text-green-700 tracking-tight hover:text-green-900 transition"
        >
          StaffTrack
        </NavLink>

        <form onSubmit={handleSearchSubmit} className="flex-grow max-w-sm mx-4">
          <input 
            type="text"
            placeholder="Search by name"
            value={searchTerm} 
            onChange={handleInputChange} 
            className="w-full border border-gray-300 rounded-xl px-2 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </form>
       
        <nav className="flex items-center gap-6 text-base font-medium">

          <NavLink
            to="/employee"
            className={({ isActive }) =>
              isActive
                ? "text-green-700 font-semibold"
                : "text-gray-700 hover:text-green-700 transition"
            }
          >
            Manage Employee
          </NavLink>
          <NavLink
            to="/addemployee"
            className={({ isActive }) =>
              isActive
                ? "text-green-700 font-semibold"
                : "text-gray-700 hover:text-green-700 transition"
            }
          >
            Add New
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
