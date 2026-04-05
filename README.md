# 💰 Finance Dashboard - Full Stack Application

## ✨ Features

### 🔐 Authentication & Security
- **User Registration & Login** with secure password hashing
- **JWT Token-based Authentication** for secure API access
- **Role-based Access Control** (Admin, Analyst, Viewer)
- **Protected Routes** with automatic token validation

### 💰 Finance Management
- **Add Financial Records** (Income & Expenses)
- **View & Filter Records** by type, category, date, and search terms
- **Update & Delete Records** with proper ownership validation
- **Pagination** for efficient data browsing
- **Category Management** with predefined categories

### 📊 Dashboard & Analytics
- **Interactive Dashboard** with financial overview
- **Summary Cards** showing total income, expenses, and balance
- **Recent Transactions** display with visual indicators
- **Category Breakdown** with progress bars
- **Real-time Statistics** and financial insights

### 🎨 User Interface
- **Modern, Responsive Design** using Tailwind CSS
- **Mobile-First Approach** with adaptive layouts
- **Beautiful Animations** and smooth transitions
- **Intuitive Navigation** with active state indicators
- **Loading States** and error handling
- **Professional Color Scheme** with accessibility considerations

### 🛠️ Technical Features
- **RESTful API** with proper HTTP status codes
- **PostgreSQL Database** with optimized queries
- **Environment Configuration** for different deployment stages
- **Error Handling** with meaningful messages
- **Input Validation** on both client and server
- **CORS Support** for cross-origin requests

## 🏗️ Architecture

```
finance-dashboard/
├── backend/                          # Node.js/Express Backend
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                # Database configuration
│   │   ├── controllers/
│   │   │   ├── authController.js    # Authentication logic
│   │   │   └── financeController.js # Finance CRUD operations
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js    # JWT verification
│   │   │   └── roleMiddleware.js    # Role-based access control
│   │   ├── models/
│   │   │   ├── userModel.js         # User database operations
│   │   │   └── financeModel.js      # Finance database operations
│   │   ├── routes/
│   │   │   ├── authRoutes.js        # Authentication endpoints
│   │   │   └── financeRoutes.js     # Finance endpoints
│   │   ├── app.js                   # Express app configuration
│   │   └── server.js                # Server entry point
│   ├── package.json
│   ├── database.sql                 # Database schema
│   └── .env                         # Environment variables
│
├── frontend/                         # React Frontend
│   ├── src/
│   │   ├── api/
│   │   │   └── financeApi.js         # API service functions
│   │   ├── components/
│   │   │   ├── Navbar.jsx           # Navigation component
│   │   │   └── FinanceTable.jsx     # Data table component
│   │   ├── context/
│   │   │   └── AuthContext.jsx      # Authentication context
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx        # Main dashboard
│   │   │   ├── Finance.jsx          # Finance records page
│   │   │   ├── AddFinance.jsx       # Add record form
│   │   │   ├── EditFinance.jsx      # Edit record form
│   │   │   ├── Login.jsx            # Login page
│   │   │   └── Register.jsx         # Registration page
│   │   ├── App.jsx                  # Main app component
│   │   └── main.jsx                 # React entry point
│   ├── package.json
│   ├── index.html
│   └── vite.config.js
│
├── My Collection.postman_collection.json  # API testing collection
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks and concurrent features
- **Vite** - Fast build tool and development server
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **Lucide Icons** - Beautiful icon library

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **PostgreSQL** - Advanced open-source relational database
- **JWT (jsonwebtoken)** - JSON Web Token for authentication
- **bcrypt** - Password hashing library
- **pg (node-postgres)** - PostgreSQL client for Node.js
- **CORS** - Cross-origin resource sharing middleware

### Development Tools
- **Nodemon** - Auto-restart for Node.js development
- **ESLint** - Code linting and formatting
- **Postman** - API testing and documentation
- **Git** - Version control system


## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/himanshu928/finance-dashboard.git
cd finance-dashboard
```

### 2. Database Setup
```bash
# Start PostgreSQL service (varies by OS)
# On Windows:
# Open Services → PostgreSQL → Start

# Create database and tables
psql -U postgres -f backend/database.sql
```

### 3. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update .env with your database credentials
# Edit the following variables:
DB_USER=your_postgres_username
DB_HOST=localhost
DB_NAME=finance_dashboard
DB_PASSWORD=your_postgres_password
DB_PORT=5432
JWT_SECRET=your_jwt_secret_key
PORT=5000

# Start the backend server
npm run dev
```

### 4. Frontend Setup
```bash
cd ../frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

### 5. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(20) NOT NULL, -- 'admin', 'analyst', 'viewer'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Finance Records Table
```sql
CREATE TABLE finance_records (
    id SERIAL PRIMARY KEY,
    amount NUMERIC NOT NULL,
    type VARCHAR(20) NOT NULL, -- 'income' or 'expense'
    category VARCHAR(100),
    date DATE,
    notes TEXT,
    user_id INT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔗 API Endpoints

### Authentication Routes (`/api/auth`)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/register` | User registration | Public |
| POST | `/login` | User login | Public |

### Finance Routes (`/api`)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/finance` | Get finance records (with filters) | Admin, Analyst |
| POST | `/finance` | Create new finance record | Authenticated Users |
| PUT | `/finance/:id` | Update finance record | Record Owner, Admin |
| DELETE | `/finance/:id` | Delete finance record | Record Owner, Admin |

### Query Parameters for GET `/finance`
- `type`: Filter by 'income' or 'expense'
- `category`: Filter by category name
- `date`: Filter by specific date
- `page`: Page number for pagination (default: 1)
- `limit`: Records per page (default: 5)
- `search`: Search in notes and categories

## 🎯 Usage Guide

### 1. User Registration
1. Navigate to the registration page
2. Fill in your name, email, and password
3. Choose your role (admin, analyst, or viewer)
4. Click "Register"

### 2. Adding Finance Records
1. Go to "Add Record" from the navigation
2. Enter the amount (use ₹ symbol)
3. Select type (Income or Expense)
4. Choose a category from the dropdown
5. Add optional date and notes
6. Click "Add Record"

### 3. Viewing Records
1. Navigate to the "Finance" page
2. Use filters to narrow down results:
   - Filter by Income/Expense
   - Search by keywords
   - Sort by different columns
3. Use pagination to browse through records

### 4. Managing Records
- **Edit**: Click the edit button on any record
- **Delete**: Click delete with confirmation prompt
- **View Details**: Click on records to see full information

### 5. Dashboard Overview
- View summary cards for total income, expenses, and balance
- Check recent transactions
- Analyze spending by category
- Use quick action buttons for common tasks

## 🔐 User Roles & Permissions

### Admin
- ✅ Full access to all features
- ✅ View all users' financial records
- ✅ Manage any financial record
- ✅ Access to all dashboard analytics

### Analyst
- ✅ View all financial records (read-only)
- ✅ Access dashboard analytics
- ✅ Add their own records
- ❌ Cannot modify others' records

### Viewer
- ✅ Add their own financial records
- ✅ View only their own records
- ✅ Access basic dashboard features
- ❌ Cannot view others' financial data

## 🧪 Testing with Postman

Import the provided `My Collection.postman_collection.json` file into Postman to test the API endpoints.

### Sample API Calls:

#### Register User
```http
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "viewer"
}
```

#### Login
```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Add Finance Record
```http
POST http://localhost:5000/api/finance
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "amount": 50000,
  "type": "income",
  "category": "Salary",
  "date": "2024-01-15",
  "notes": "Monthly salary"
}


### Environment Variables for Production
```env
# Backend .env
NODE_ENV=production
DB_USER=your_prod_db_user
DB_HOST=your_prod_db_host
DB_NAME=your_prod_db_name
DB_PASSWORD=your_prod_db_password
DB_PORT=5432
JWT_SECRET=your_secure_jwt_secret
PORT=5000



## 🙏 Acknowledgments

- **React** team for the amazing frontend framework
- **Tailwind CSS** for the utility-first CSS framework
- **PostgreSQL** for the robust database system
- **Node.js** community for the excellent runtime environment
