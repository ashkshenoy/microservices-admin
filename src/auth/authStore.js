import { create } from "zustand";
import { login as apiLogin, register as apiRegister } from "../lib/endpoints";
import { jwtDecode } from "jwt-decode";


export const useAuth = create((set) => ({
  user: null,
  token: null,

  // -------------------
  // LOGIN
  // -------------------
  login: async (email, password) => {
    try {
      const res = await apiLogin(email, password);

      const token = res.data.token;
      const decoded = jwtDecode(token);

      const user = {
        id: decoded.userId,
        email: decoded.email,
        role: decoded.role, // <-- IMPORTANT
      };

      set({ user, token });
      localStorage.setItem("authToken", token);

      return true;
    } catch (err) {
      console.error("Login failed:", err);
      return false;
    }
  },

  // -------------------
  // REGISTER
  // -------------------
  register: async (name, email, password) => {
    try {
      const res = await apiRegister(name, email, password);

      // Registration succeeded
      return true;
    } catch (err) {
      console.error("Registration failed:", err);
      return false;
    }
  },

  // -------------------
  // LOAD FROM STORAGE (AUTO-LOGIN)
  // -------------------
  loadUserFromStorage: () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);

      const user = {
        id: decoded.userId,
        email: decoded.email,
        role: decoded.role, // <-- IMPORTANT
      };

      set({ user, token });
    } catch (err) {
      console.log("Invalid stored token, clearing...");
      localStorage.removeItem("authToken");
    }
  },

  // -------------------
  // LOGOUT
  // -------------------
  logout: () => {
    localStorage.removeItem("authToken");
    set({ user: null, token: null });
  },
}));
