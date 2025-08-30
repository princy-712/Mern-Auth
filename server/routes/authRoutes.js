// routes/authRoutes.js
import express from "express";
// routes/authRoutes.js
import { register, login, logout, sendVerifyOtp, verifyEmail, isAuthenticated, sendResetOtp, resetPassword } from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";


const authRouter = express.Router();

// Register user
authRouter.post("/register", register);

// Login user
authRouter.post("/login", login);

// Logout user
authRouter.post("/logout", logout);

// Send verification OTP
authRouter.post("/send-verify-otp", userAuth, sendVerifyOtp);

// Verify account
authRouter.post("/verify-account", userAuth, verifyEmail);

// account Authentication
authRouter.post("/is-auth", userAuth, isAuthenticated);

// Send Password Reset OTP
authRouter.post("/send-reset-otp", sendResetOtp);

// Reset Password
authRouter.post("/reset-password", resetPassword);

export default authRouter;


