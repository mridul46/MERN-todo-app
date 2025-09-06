import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-todo-app-backend-7xqu.onrender.com/api/v1",
  withCredentials: true, // ✅ send/receive cookies
});

export default API;
