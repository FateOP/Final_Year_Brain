import { Link, useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">

      <div className="bg-white p-10 rounded-3xl shadow-xl w-[450px]">

        <h1 className="text-4xl font-bold text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Login to your account
        </p>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-4 rounded-xl mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-4 rounded-xl mb-6"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-4 rounded-xl"
        >
          Login
        </button>

        <p className="text-center mt-6">
          Don't have an account?
          <Link
            to="/signup"
            className="text-blue-600 ml-2"
          >
            Sign Up
          </Link>
        </p>

      </div>

    </div>
  );
}