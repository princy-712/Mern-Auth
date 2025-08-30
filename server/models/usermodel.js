// models/UserModel.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: 6,
    },
    verifyOtp: {
      type: String,
      default: '',
    },
    verifyOtpExpireAt: {
      type: Number,
      default: 0,
      expires: '5m', // Automatically remove documents after 5 minutes
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
    resetOtp: {
      type: String,
      default: '',
    },
    resetOtpExpireAt: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true } // adds createdAt & updatedAt
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
