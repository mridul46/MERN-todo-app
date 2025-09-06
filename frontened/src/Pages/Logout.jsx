import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    navigate("/login", { replace: true });
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 animate-fade-in">
      <div className="flex items-center gap-4">
        <div className="w-6 h-6 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
        <h2 className="text-xl font-semibold text-gray-200">Logging out...</h2>
      </div>
    </div>
  );
}