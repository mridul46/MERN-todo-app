import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");  // ✅ check localStorage instead of cookie
  return token ? children : <Navigate to="/login" replace />;
}
