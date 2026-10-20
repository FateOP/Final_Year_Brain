import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCase } from "../context/caseContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useCase();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin"); // 'admin' or 'patient'

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      // Send login credentials to the FastAPI + MongoDB backend
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role })
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        // Save the secure JWT token and role to localStorage
        localStorage.setItem("userRole", data.role);
        localStorage.setItem("authToken", data.token); 
        
        // Update the global React context state
        login(data.email); 
        
        // Route the user based on their authenticated role
        if (data.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/reports");
        }
      } else {
        alert(data.error || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Login failed. Please check if the AI backend server is running.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">
        
        <h1 className="text-4xl font-bold text-center mb-2">Welcome Back</h1>
        <p className="text-center text-gray-500 mb-8">Login to your account</p>

        {/* Role Selection Toggle */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-8">
          <button
            onClick={() => setRole("admin")}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-200 ${
              role === "admin" 
                ? "bg-white text-blue-600 shadow-sm" 
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Doctor / Admin
          </button>
          <button
            onClick={() => setRole("patient")}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-200 ${
              role === "patient" 
                ? "bg-white text-blue-600 shadow-sm" 
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Patient
          </button>
        </div>

        {/* Inputs */}
        <div className="space-y-4 mb-6">
          <input
            type="email"
            placeholder={role === "admin" ? "Doctor Email" : "Patient Email or ID"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white py-4 rounded-xl font-bold text-lg shadow-md"
        >
          Login as {role === "admin" ? "Admin" : "Patient"}
        </button>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?
          <Link to="/signup" className="text-blue-600 font-semibold ml-2 hover:underline">
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}