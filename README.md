# 💰 Finance Dashboard Full Stack Application

A full stack Finance Dashboard application built using **React, Node.js, Express, PostgreSQL, and JWT Authentication**.
This project allows users to manage their financial records with secure authentication, role-based access, filtering, pagination, and a professional dashboard UI.

---

# 🚀 Features

* 🔐 User Authentication (Register & Login)
* 🪪 JWT Token-based Authorization
* 👥 Role-based Access (Admin & Viewer)
* 💰 Add Finance Records
* 📋 View Finance Records
* ✏️ Update Finance Records
* ❌ Delete Finance Records
* 🔍 Filter by Type (Income / Expense)
* 📄 Pagination
* 📊 Dashboard Summary (Income, Expense, Balance)
* 📦 PostgreSQL Database
* 🎨 Responsive UI with Tailwind CSS
* 🧪 Postman Collection Included

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Tailwind CSS
* Axios
* React Router

## Backend

* Node.js
* Express.js
* PostgreSQL
* JWT
* bcrypt
* CORS
* dotenv

## Tools

* Postman
* Git & GitHub
* VS Code

---

# 📁 Project Structure

finance-dashboard-fullstack

│

├── backend

│ ├── src

│ │ ├── controllers

│ │ ├── routes

│ │ ├── middleware

│ │ ├── db

│ │ └── app.js

│ │

│ ├── database.sql

│ ├── package.json

│ └── .env.example

│

├── frontend

│ ├── src

│ ├── public

│ └── package.json

│

├── My Collection.postman_collection.json

├── README.md

└── .gitignore

---

# ⚙️ Installation & Setup

## Step 1: Clone Repository

git clone git@github.com:himanshu928/finance-dashboard.git
cd finance-dashboard

---

# 🔧 Backend Setup

cd backend

npm install

Create `.env` file:

PORT=5000

DATABASE_URL=your_postgresql_url

JWT_SECRET=your_secret_key

Run server:

npm start

Backend runs on:

http://localhost:5000

---

# 🎨 Frontend Setup

Open new terminal

cd frontend

npm install

npm run dev

Frontend runs on:

http://localhost:5173

---

# 🗄️ Database Setup

Open PostgreSQL

Run:

database.sql

This will create:

users table

finance_records table

---

# 🔐 API Endpoints

## Auth

POST /api/auth/register

POST /api/auth/login

---

## Finance

GET /api/finance

POST /api/finance

PUT /api/finance/:id

DELETE /api/finance/:id

---

# 🧪 Postman Collection

Postman collection is included in project:

My Collection.postman_collection.json

Import into Postman and test APIs.

---

# 👤 User Roles

## Admin

Can add finance

Can edit finance

Can delete finance

Can view finance

## Viewer

Can only view finance

Cannot add or delete

---

# 📊 Dashboard

Shows:

Total Income

Total Expense

Balance

Finance Table

Filter

Pagination

CRUD operations

---

# 🔒 Environment Variables

Create `.env` in backend:

PORT=5000

DATABASE_URL=postgresql://username:password@localhost:5432/finance_db

JWT_SECRET=finance_secret

---

# 📸 Screenshots

Login Page

Dashboard

Finance Table

Add Finance

Edit Finance

---

# 🚀 Deployment (Optional)

Frontend → Vercel

Backend → Render / Railway

Database → Neon PostgreSQL

---

# 📌 Author

Himanshu Sahu

Full Stack Developer (MERN)

GitHub: https://github.com/himanshu928

---

# ⭐ Project Status

Completed and ready for:

Internship submission

GitHub portfolio

Job applications

Full stack project showcase

---

# 🙌 Thank You
