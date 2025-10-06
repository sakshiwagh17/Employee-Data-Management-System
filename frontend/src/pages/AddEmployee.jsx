import React, { useState } from "react";
import axios from "../lib/axios";
import { toast } from "react-toastify";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
  });
  const [errors, setErrors] = useState({}); 
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    if (errors[e.target.id]) {
        setErrors(prev => ({ ...prev, [e.target.id]: null }));
    }
    
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
        newErrors.name = "Employee name is required.";
    }
    if (!formData.email.trim()) {
        newErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email address is invalid.";
    }
    if (!formData.position.trim()) {
        newErrors.position = "Position is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
        toast.error("Please correct the form errors.");
        return;
    }
    
    setIsLoading(true);
    
    try {
      const res = await axios.post("/employee", formData); 
      toast.success(res.data.message || "Employee created successfully!");
      setFormData({ name: "", email: "", position: "" }); // reset form
      
    } catch (error) {
      console.error("Error in Employee Form", error);
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";

      toast.error(errorMessage);
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-50 to-yellow-50 p-5 flex items-center justify-center">
      <div className="flex flex-col">
        <h3 className="text-2xl font-bold text-green-700 mb-6 text-center">
          Welcome Aboard!
        </h3>
        <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-xl">

          <form onSubmit={handleSubmit} className="space-y-5"> 
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Name"
                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                    errors.name 
                        ? "border-red-500 focus:ring-red-500" 
                        : "border-gray-300 focus:ring-green-500"
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p> 
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                    errors.email 
                        ? "border-red-500 focus:ring-red-500" 
                        : "border-gray-300 focus:ring-green-500"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">Position</label>
              <input
                type="text"
                id="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="Enter Position"
                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                    errors.position 
                        ? "border-red-500 focus:ring-red-500" 
                        : "border-gray-300 focus:ring-green-500"
                }`}
              />
              {errors.position && (
                <p className="mt-1 text-sm text-red-500">{errors.position}</p> 
              )}
            </div>
            
            <button
              type="submit"
              disabled={isLoading} 
              className={`w-full text-white rounded-lg py-2 font-medium transition ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-700 hover:bg-green-800"
              }`}
            >
              {isLoading ? "Adding..." : "Add Employee"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;