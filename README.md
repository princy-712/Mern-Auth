🔐 MERN Authentication System

A full-stack MERN authentication system with email verification, OTP-based password reset, and user session management.

🚀 Features

User Registration & Login

Email Verification (via OTP)

JWT-based Authentication & Authorization

Forgot Password Flow

Request Reset OTP

Verify OTP

Set New Password

Account Verification Flow

Protected Routes (frontend + backend)

Logout functionality

Toast notifications for success/error

🛠️ Tech Stack

Frontend (React)

React 18

React Router DOM

Axios

TailwindCSS

React Hot Toast

Backend (Node.js + Express)

Express.js

MongoDB + Mongoose

JWT Authentication

Nodemailer (for email OTPs)

bcryptjs (password hashing)

dotenv (environment config)

📂 Project Structure
project/
│
├── backend/
│   ├── controllers/
│   │   └── authController.js
│   ├── middleware/
│   │   └── userAuth.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── authRoutes.js
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── EmailVerify.jsx
│   │   │   ├── ResetPassword.jsx
│   │   │   └── NewPassword.jsx
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   └── App.jsx
│   └── .env
│
└── README.md

⚙️ Setup Instructions
1️⃣ Clone the repository
git clone https://github.com/your-username/your-repo.git
cd project

2️⃣ Backend Setup
cd backend
npm install


Create a .env file inside backend/ and add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
FRONTEND_URL=http://localhost:5173
PORT=4000


Run backend server:

npm start

3️⃣ Frontend Setup
cd frontend
npm install


Create a .env file inside frontend/ and add:

VITE_BACKEND_URL=http://localhost:4000


Run frontend:

npm run dev

🔑 API Endpoints
Auth Routes (/api/auth)
Method	Endpoint	Description
POST	/register	Register new user
POST	/login	Login user
POST	/logout	Logout user
POST	/send-verify-otp	Send email verification OTP
POST	/verify-account	Verify user account
POST	/is-auth	Check authentication status
POST	/send-reset-otp	Send password reset OTP
POST	/reset-password	Reset user password
🖼️ Screens

Register Page → Signup with name, email, password

Login Page → Login with email & password

Email Verification Page → Enter OTP sent via email

Forgot Password Flow → Request OTP → Enter OTP → Reset password

Navbar → Shows username, Logout button (after login)

🎯 Future Improvements

Add Google/GitHub OAuth login

Rate limit OTP requests

Add reCAPTCHA for security

👨‍💻 Author

Developed by Princy Sahu ✨
