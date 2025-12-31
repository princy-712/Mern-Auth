# 🔐 MERN Authentication System
**Live Demo link** https://mern-auth-frontend-mcit.onrender.com

A secure and full-featured authentication system built using the **MERN stack**.  
This project includes user registration, login, email verification via OTP, password reset using OTP, JWT-based authentication, and secure password hashing.

---

## 🚀 Features

- User Registration & Login
- JWT-based Authentication (stored in HTTP-only cookies)
- Email Verification using OTP
- Password Reset using OTP
- Secure Password Hashing with bcrypt
- Protected Routes & Auth Middleware
- Toast Notifications for user feedback
- Clean and responsive UI with Tailwind CSS

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- React Router DOM
- Axios
- Tailwind CSS
- React Toastify

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- bcrypt.js
- Nodemailer
- dotenv

---

## 📁 Project Structure

mern-auth/
│
├── client/ # React Frontend

│ ├── src/

│ │ ├── pages/

│ │ ├── context/

│ │ ├── components/

│ │ └── App.jsx
│

├── server/ # Node + Express Backend

│ ├── controllers/

│ ├── routes/

│ ├── middleware/

│ ├── models/

│ └── server.js
│

└── README.md


---

## ⚙️ Environment Variables

Create a `.env` file in the **server** folder and add:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SENDER_EMAIL=your_email@gmail.com
EMAIL_PASS=your_email_app_password
NODE_ENV=development
```
## 🧪 API Routes
### Auth Routes
Method	Endpoint	Description

POST	``` /api/auth/register```	Register user

POST	``` /api/auth/login```	Login user

POST	``` /api/auth/logout```	Logout user

POST	``` /api/auth/send-verify-otp```	Send email verification OTP

POST	``` /api/auth/verify-account```	Verify email

POST	``` /api/auth/send-reset-otp```	Send reset password OTP

POST	``` /api/auth/reset-password```	Reset password


### ▶️ Run Locally

## 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/mern-auth.git
```
## 2️⃣ Install Dependencies

Backend
```bash
cd server
npm install
npm run dev
```
Frontend
```bash
cd client
npm install
npm run dev
```

## 🔒 Security Practices

- Passwords are hashed using bcrypt
- JWT stored in HTTP-only cookies
- OTPs have expiry time
- Protected routes using middleware

## Screenshots
<img width="1470" height="697" alt="Screenshot 2025-12-31 at 8 22 07 PM" src="https://github.com/user-attachments/assets/61d595ee-fe2b-454c-b9ec-e6ce43588be0" />
<img width="1470" height="843" alt="Screenshot 2025-12-31 at 8 22 28 PM" src="https://github.com/user-attachments/assets/1a7763b0-3045-4187-b541-de9c2a679b20" />



