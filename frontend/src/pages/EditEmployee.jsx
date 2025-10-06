import React, { useState, useEffect } from "react";
import axios from "../lib/axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom"; 

const EditEmployee = () => {
  const { id } = useParams();  //to get the id from url
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
  });
  const [isLoading, setIsLoading] = useState(true); 
  const [isSubmitting, setIsSubmitting] = useState(false); 

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(`/employee/${id}`);
        const employeeData = res.data.data; 

        //to get the existng values to update
        setFormData({
          name: employeeData.name || "",
          email: employeeData.email || "",
          position: employeeData.position || "",
        });
        setIsLoading(false);

      } catch (error) {
        console.error("Error fetching employee:", error);
        toast.error("Employee not found or failed to load data.");
        navigate('/'); 
      }
    };
    
    if (id) {
      fetchEmployee();
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); 
    
    try {
    
      const res = await axios.put(`/employee/${id}`, formData); 
      toast.success(res.data.message || "Employee updated successfully!");
      navigate('/');
      
    } catch (error) {
      console.error("Error updating employee:", error);
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred during update.";

      toast.error(errorMessage);
      
    } finally {
      setIsSubmitting(false);
    }
  };


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-green-700">
        Loading employee data for editing!
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-50 to-yellow-50 p-5 flex items-center justify-center">
      <div className="flex flex-col">
      
        <h3 className="text-2xl font-bold text-green-700 mb-6 text-center">
          Edit Employee: {formData.name}
        </h3>
        <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-xl">

          <form onSubmit={handleSubmit} className="space-y-5"> 
        
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                Position
              </label>
              <input
                type="text"
                id="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="Enter Position"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting} 
              className={`w-full text-white rounded-lg py-2 font-medium transition ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-700 hover:bg-green-800"
              }`}
            >
              {isSubmitting ? "Saving" : "Update Employee"} 
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;