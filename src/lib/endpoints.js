import api from "./api";

export const login = (email, password) =>
  api.post("/api/users/login", { email, password });
export const register = (name, email, password) =>
  api.post("/api/users/register", { name, email, password });

// USERS
export const getCurrentUser = () => api.get("/api/users/me");
export const getAllUsers = () => api.get("/api/users");
export const updateUserRole = (id, role) =>
  api.put(`/api/users/${id}/role`, { role });

// PRODUCTS
export const getProducts = () => api.get("/api/products");
export const createProduct = (data) => api.post("/api/products", data);
export const updateProduct = (id, data) => api.put(`/api/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/api/products/${id}`);

// INVENTORY
export const getInventory = () => api.get("/api/inventory");
export const createInventory = (data) => api.post("/api/inventory", data);
export const updateInventoryStock = (id, newStock) =>
  api.put(`/api/inventory/${id}`, { stock: newStock });
export const deleteInventoryItem = (id) =>
  api.delete(`/api/inventory/${id}`);

// ORDERS
export const createOrder = (data) => api.post("/api/orders", data);
export const getOrders = () => api.get("/api/orders");
export const getOrder = (id) => api.get(`/api/orders/${id}`);
