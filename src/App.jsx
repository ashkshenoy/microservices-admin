import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layouts/AppLayout";
import { useAuth } from "./auth/authStore";
import { useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Inventory from "./pages/Inventory";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import Login from "./pages/Login";
import ProtectedRoute from "./auth/ProtectedRoute";
import Register from "./pages/Register";
import { Toaster } from "sonner";
export default function App() {
  const loadUserFromStorage = useAuth((s) => s.loadUserFromStorage);

  useEffect(() => {
    loadUserFromStorage();
  }, []);
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }>
          <Route path="/" element={<Dashboard />} />
          
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products/>} />
          <Route path="/inventory" element={<Inventory/>} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/users" element={<Users/>} />
          <Route path="/settings" element={<Settings/>} />
          <Route path="/notifications" element={<Notifications/>} />
        </Route>
      </Routes>
    </BrowserRouter>
    <Toaster richColors position="top-right" />
    </>
  );
}
