# User Management Project

This project is a simple User Management system built with React (v18) for the frontend and PHP (v8) with MySQL (v8) for the backend. Follow the steps below to set up and run the project on your system.

## Prerequisites
Before you begin, ensure you have the following installed on your system:

Node.js (v16 or later)

PHP (v8 or later)

MySQL (v8 or later)

A web server like XAMPP or WAMP for running PHP

Composer (Optional, for managing PHP dependencies)

## 1. Clone the Repository


```bash
git clone <repository-url>
cd <repository-folder>
```

## 2. Set Up the Backend (PHP + MySQL)

### a. Configure the Database

1. Open phpMyAdmin (or your MySQL client).

2. Create a new database (e.g., user_management).

3. mport the database.sql file located in the backend folder to set up the required tables and data:

```bash 
mysql -u <username> -p user_management < backend/database.sql
```

### b. Configure the Backend

1. Navigate to the backend folder:

```bash
cd backend
```

2. Open the config/database.php file and update the database credentials.

```bash
    private $host = 'localhost';
    private $username = 'root';
    private $password = '';
    private $database = 'user_management';
    public $conn;
```

3. Start the PHP development server

use XAMPP/WAMP to host the backend in the htdocs directory (e.g., htdocs/user_management/backend).


## 3. Set Up the Frontend (React)

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install the dependencies:

```bash
npm install
```

3. Start the development server
```bash
npm start
```

## 4. Access the Application
- Open the browser and go to
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000/api/users.php

# Features
- Add, edit, delete, and view users.
- Form validation for user input.
- Responsive UI built with React and TailwindCSS.
- API integration using Axios.