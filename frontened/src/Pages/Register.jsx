import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Api";

export default function Register() {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!fullname.trim()) return setError("Full name is required.");
    if (!username.trim()) return setError("Username is required.");
    if (!emailRegex.test(email)) return setError("Invalid email address.");
    if (password.length < 6) return setError("Password must be at least 6 characters long.");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const res = await API.post("/auth/register", {
        fullname: fullname.trim(),
        username: username.trim(),
        email: email.trim(),
        password,
      });

      console.log("Register response:", res.data);

      const token = res.data?.data?.accessToken;
      console.log("token:", res.data);
      if (token) {
        localStorage.setItem("token", token);
        setTimeout(() => navigate("/"), 100);
      }
    } catch (err) {
      console.error("Register error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 animate-fade-in">
      <h2 className="text-3xl font-semibold text-gray-200 mb-8">Create an Account</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-md"
      >
        {error && (
          <div className="text-red-200 text-sm p-3 bg-red-900/50 rounded-lg border border-red-700">
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Full Name"
          className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gradient-to-r focus:from-blue-500 focus:to-purple-500 transition-all duration-300"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Username"
          className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gradient-to-r focus:from-blue-500 focus:to-purple-500 transition-all duration-300"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gradient-to-r focus:from-blue-500 focus:to-purple-500 transition-all duration-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gradient-to-r focus:from-blue-500 focus:to-purple-500 transition-all duration-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-lg transition-all duration-300 hover:shadow-md disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      <p className="mt-6 text-sm text-gray-300">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-emerald-400 cursor-pointer hover:text-emerald-300 hover:underline transition-all duration-300"
        >
          Login
        </span>
      </p>
    </div>
  );
}