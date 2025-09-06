import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// CORS configuration (single middleware)
app.use(cors({
  origin: process.env.CORS_ORIGIN || "https://mern-todo-app-frontend-tnri.onrender.com", "http://localhost:3000"
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Body parsers
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Static files and cookies
app.use(express.static("public"));
app.use(cookieParser());

// Import routes
import healthCheckRouter from "./routes/healthcheck.routes.js";
import authRouter from "./routes/auth.routes.js";
import taskRouter from "./routes/task.routes.js";

// Mount routes
app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/task", taskRouter);

// Root route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
