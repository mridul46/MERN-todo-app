import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import SignIn from "./Pages/Login";
import SignUp from "./Pages/Register";
import Logout from "./Pages/Logout"; 
import ProtectedRoute from "./Components/ProtectedRoute"; // ✅ route guard

function Layout() {
  return (
    <>
      {/* ✅ Navbar always visible */}
      <Navbar />

      {/* ✅ Routes */}
      <Routes>
        {/* Public routes */}
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Logout */}
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
