# 📝 MERN Todo App

A full-stack **MERN (MongoDB, Express, React, Node.js)** application with **JWT Authentication**, built to manage daily tasks efficiently. Users can **register, log in, create, update, and delete tasks**.  

🌐 **Live Demo (Frontend):** [MERN Todo Frontend](https://mern-todo-app-frontend-ln7g.onrender.com/login)  
📄 **API Documentation (Postman):** [View API Docs](https://documenter.getpostman.com/view/41811237/2sB3Hkr1Fn)  

---

## 🚀 Features
- 🔑 User Authentication (JWT-based, Login/Register)  
- ✅ CRUD operations for tasks (Create, Read, Update, Delete)  
- 🔒 Secure APIs with Authorization  
- 🌍 CORS-configured for frontend-backend integration  
- ☁️ Deployment on **Render** (Frontend + Backend)  

---

## 🛠️ Tech Stack
- **Frontend:** React, React Router, Axios, TailwindCSS (optional)  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Atlas)  
- **Authentication:** JWT (Access & Refresh Tokens)  
- **Tools:** Postman, Git, Render  

---

## 📦 Installation & Setup (Local)

```bash
 Clone the repository
git clone https://github.com/mridul46/MERN-todo-app.git
cd MERN-todo-app
Backend
cd Backend
npm install


create a .env file in Backend/ and add:
PORT=5000
MONGO_URI=your_mongodb_uri
ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
CORS_ORIGIN=http://localhost:3000


Run backend:
npm start

Frontend
cd Frontend
npm install
npm start

🌐 Deployment on Render
Frontend → Deployed as a static site (npm run build)
Backend → Deployed as a web service with environment variables
Database → MongoDB Atlas (Cloud-hosted)

📖 API Documentation
All API endpoints are documented here:
👉 Postman Docs https://documenter.getpostman.com/view/41811237/2sB3Hkr1Fn

📌 Future Improvements
🔔 Add notifications/reminders for tasks
📅 Calendar integration
👥 Multi-user collaboration
