# Finance Dashboard API 🚀
Node.js | Express | PostgreSQL | JWT | Role-Based Access | REST API

## 📌 Project Overview

Finance Dashboard API is a backend application built using **Node.js, Express.js, and PostgreSQL** with **JWT Authentication and Role-Based Authorization**.

This project allows users to manage financial records securely with different roles like **Admin, Analyst, and Viewer**.

The system supports:

* User authentication
* Role-based access control
* Finance record management
* Filtering and pagination
* Secure API structure

This project follows **industry-level backend architecture** and is suitable for **internships, assignments, and real-world applications**.

---

# 🚀 Features

* JWT Authentication
* Role-Based Authorization
* Admin, Analyst, Viewer roles
* Create Finance Records
* Get Finance Records
* Update Finance Records
* Delete Finance Records
* Filtering (type, category, date)
* Pagination
* PostgreSQL Database
* Secure API Routes
* MVC Folder Structure

---

# 🛠️ Tech Stack

* Node.js
* Express.js
* PostgreSQL
* JWT
* bcrypt
* dotenv
* nodemon
* Postman

---

# 📂 Project Structure

```
finance-dashboard
│
├── src
│   ├── config
│   │     db.js
│
│   ├── controllers
│   │     authController.js
│   │     financeController.js
│
│   ├── middleware
│   │     authMiddleware.js
│   │     roleMiddleware.js
│
│   ├── models
│   │     userModel.js
│   │     financeModel.js
│
│   ├── routes
│   │     authRoutes.js
│   │     financeRoutes.js
│
│   ├── app.js
│   └── server.js
│
├── .env
├── package.json
├── README.md
└── database.sql
```

---

# ⚙️ Installation

## 1. Clone the repository

```
git clone https://github.com/your-username/finance-dashboard.git
```

## 2. Go to project folder

```
cd finance-dashboard
```

## 3. Install dependencies

```
npm install
```

## 4. Create .env file

```
PORT=5000

DB_USER=postgres
DB_HOST=localhost
DB_NAME=finance_dashboard
DB_PASSWORD=yourpassword
DB_PORT=5432

JWT_SECRET=your_secret_key
```

## 5. Run PostgreSQL

Make sure PostgreSQL is running.

---

# 🗄️ Database Setup

Run this SQL in PostgreSQL:

```
CREATE DATABASE finance_dashboard;
```

Connect database:

```
\c finance_dashboard
```

Create Users Table:

```
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password TEXT,
    role VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Create Finance Records Table:

```
CREATE TABLE finance_records (
    id SERIAL PRIMARY KEY,
    amount NUMERIC NOT NULL,
    type VARCHAR(20) NOT NULL,
    category VARCHAR(100),
    date DATE,
    notes TEXT,
    user_id INT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# ▶️ Run Server

```
npm run dev
```

Server will start:

```
Server running on port 5000
Database connected
```

---

# 🔐 Authentication APIs

## Register

POST /api/auth/register

```
{
  "name": "Himanshu",
  "email": "himanshu@gmail.com",
  "password": "123456",
  "role": "admin"
}
```

---

## Login

POST /api/auth/login

```
{
  "email": "himanshu@gmail.com",
  "password": "123456"
}
```

Response:

```
token
```

---

# 💰 Finance APIs

## Create Finance

POST /api/finance

Admin only

---

## Get Finance

GET /api/finance

Admin and Analyst

---

## Update Finance

PUT /api/finance/:id

Admin only

---

## Delete Finance

DELETE /api/finance/:id

Admin only

---

# 🔍 Filtering

```
GET /api/finance?type=income
GET /api/finance?category=salary
GET /api/finance?date=2026-04-02
```

---

# 📊 Pagination

```
GET /api/finance?page=1&limit=5
GET /api/finance?page=2&limit=5
```

---

# 👥 Roles

## Admin

* Create Finance
* Get Finance
* Update Finance
* Delete Finance

## Analyst

* Get Finance only

## Viewer

* No access

---

# 🧪 Testing

Use Postman

Add Header:

```
Authorization: Bearer TOKEN
```

---

# 📌 Author

Himanshu Sahu

Full Stack Web Developer

---

# ⭐ Project Goal

This project demonstrates:

* Backend development skills
* Database management
* API development
* Authentication and authorization
* Real-world project structure

This project is built for **learning, internship, and professional portfolio**.
