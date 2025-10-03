import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const { data } = await axios.post("http://localhost:3000/api/auth/login", {
          email,
          password,
        });

        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        if (data.role === "admin") {
          navigate("/admin");
        } else if (data.role === "agent") {
          navigate("/agent");
        } else {
          toast.error("Unknown role");
        }
      } else {
        await axios.post("http://localhost:3000/api/auth/register", {
          name: "Admin",
          email,
          password,
        });
        toast.success("Admin registered successfully! Please login now.");
        setIsLogin(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-700">
      <div className="bg-white/20 backdrop-blur-xl shadow-2xl rounded-2xl p-8 w-full max-w-md border border-white/30">
        {/* Tabs */}
        <div className="flex mb-6">
          <button
            className={`flex-1 py-2 text-lg font-semibold ${
              isLogin
                ? "text-yellow-400 border-b-2 border-yellow-400"
                : "text-gray-300"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 text-lg font-semibold ${
              !isLogin
                ? "text-yellow-400 border-b-2 border-yellow-400"
                : "text-gray-300"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Register (Admin)
          </button>
        </div>

        <h2 className="text-2xl font-bold text-center text-white mb-2">
          {isLogin ? "Welcome Back 👋" : "Create Admin Account 🛠️"}
        </h2>
        <p className="text-center text-gray-200 mb-6">
          {isLogin
            ? "Login to access your Dashboard"
            : "Register once to setup the Admin panel"}
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-100 text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border-0 rounded-lg px-4 py-2 bg-white/30 text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-100 text-sm mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full border-0 rounded-lg px-4 py-2 bg-white/30 text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-200 hover:text-yellow-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 rounded-lg transition transform hover:scale-105 shadow-lg"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
