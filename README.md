# 👨‍💼 StaffTrack: Employee Data Management System

A robust, full-stack **C.R.U.D. (Create, Read, Update, Delete)** application designed for efficient management of employee records.  
It emphasizes a clean interface, quick data access, and comprehensive user feedback — featuring **server-side search** and **client-side validation**.

---

## ✨ Features

🧩 **Full Employee CRUD Operations**  
Create, Read, Update, and Delete employee records seamlessly via RESTful API endpoints.

🗄️ **PostgreSQL Data Persistence**  
All employee data is securely stored and managed using PostgreSQL.

⚙️ **Express.js REST API**  
Backend follows RESTful architecture for clean, resource-centric request handling.

🔍 **Global Search & Filter**  
Search employees by name using a performant server-side search query.

✅ **Instant Form Validation**  
Frontend ensures proper input validation before API submission.

🔔 **Toast Notifications**  
Real-time success and error alerts using React Toastify for all operations.

📱 **Responsive UI with Tailwind CSS**  
Modern, mobile-friendly interface built with Tailwind CSS for smooth usability.
 

---

## 🛠️ Tech Stack

### 🖥️ Frontend

| Technology | Role |
|-------------|------|
| React | UI framework and component architecture |
| Tailwind CSS | Styling and rapid, utility-first UI development |
| React Router | Client-side routing for seamless navigation |
| Axios | Making asynchronous HTTP requests to the backend API |
| React Toastify | User feedback notifications |

---

### ⚙️ Backend

| Technology | Role |
|-------------|------|
| Express.js | Web framework for building the RESTful API |
| Node.js | JavaScript runtime environment |
| PostgreSQL | Primary relational database for persistent storage |
| Joi | *(Optional)* for robust backend schema validation |

---

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)  
- **npm** or **yarn**  
- **PostgreSQL**  
- **Git**  

---

## 💻 Local Setup

### 1️⃣ Clone the Repository

```bash
git clone [YOUR_REPOSITORY_URL]
```

### 2️⃣ Install Dependencies

Run installations in both backend and frontend directories:
```bash
# Backend Installation
cd backend
npm install
nodemon server.js

# Frontend Installation
cd frontend
npm install
npm run dev
```

### 3️⃣ Environment Configuration

Create a file named .env inside your backend directory.
```bash
# Server Configuration
PORT=5001

# Database Configuration (PostgreSQL)
DB_USER=your_postgres_user
DB_HOST=localhost
DB_DATABASE=stafftrack_db
DB_PASSWORD=your_password
DB_PORT=5432
```
### 4️⃣ Database Setup

Execute the following SQL command in your PostgreSQL client (pgAdmin, psql) to set up the table:

```bash
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    position VARCHAR(100)
);
```
## 🧪 Testing

To ensure reliability of the core API endpoints:
```bash
cd backend
npm test

```
## 📄 Project Structure
```bash
StaffTrack/
├── backend/            # Express.js API Server
│   ├── config/         # Database connection setup
│   ├── controllers/    # CRUD logic (employee.controller.js)
│   ├── routes/         # API routes (employee.route.js)
│   └── .env            # Environment variables
│
├── frontend/           # React Application
│   ├── src/
│   │   ├── pages/      # Route-level components (EmployeeTable, EmployeeForm)
│   │   ├── components/ # Reusable UI components (Navbar)
│   │   └── lib/        # Axios configuration
│   └── package.json    # Frontend dependencies
│
├── package.json        # Root dependencies (scripts)
└── README.md
```


---

## 🔗 API Endpoints

All routes are prefixed with:


### 🧍 Employee Routes

| Method | Endpoint | Description |
|---------|-----------|--------------|
| **GET** | `/` | Get all employees |
| **GET** | `/:id` | Get employee by ID |
| **POST** | `/` | Add a new employee |
| **PUT** | `/:id` | Update employee details |
| **DELETE** | `/:id` | Delete employee by ID |
| **GET** | `/search?name=John` | Search employees by name |

---

🧾 **Example Base URL:**  
`http://localhost:5001/api/employee`

---
### 🎥 Project Video

Google Drive:https://drive.google.com/file/d/1mioqfdCI6O13K3zrWTdVBrF8kmSabSNs/view?usp=drive_link
