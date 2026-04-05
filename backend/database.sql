-- Create Database
CREATE DATABASE finance_dashboard;

-- Connect Database
\c finance_dashboard;

-- Users Table
CREATE TABLE users (
id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
password TEXT NOT NULL,
role VARCHAR(20) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Finance Records Table
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

-- Sample Admin User
INSERT INTO users (name, email, password, role)
VALUES (
'Admin User',
'[admin@gmail.com](mailto:admin@gmail.com)',
'$2b$10$examplehashedpassword',
'admin'
);
