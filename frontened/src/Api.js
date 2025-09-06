import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-todo-app-backend-7xqu.onrender.com",
  withCredentials: true, // ✅ send/receive cookies
});

export default API;
