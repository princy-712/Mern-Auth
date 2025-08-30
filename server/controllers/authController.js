// controllers/auth.controller.js
import userModel from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import transporter from "../config/nodemailer.js"

// @desc Register new user
export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Missing Details" });
    }
  try {
    
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({success: false, message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user =new userModel({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production"?
      'none': 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Sending welcome email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to Our Service",
      text: `Hello ${name},\n\nThank you for registering! We're glad to have you on board. Your Account has been created with email id: ${email}.\n\nBest of luck,\nThe Team`,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ success: false, message: "Email sending failed" });
      }
      console.log("Email sent:", info.response);
    });

    return res.json({success: true});

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Login user

export const login = async (req, res) => {
     const { email, password } = req.body;

     if(!email || !password) {
      return res.status(400).json({ success: false, message: "Email and Password are required" });
    }
  try {
   

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({success: false, message: "Invalid credentials" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({success: false, message: "Invalid credentials" });

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

     return res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production"?
      'none': 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        id: user._id,
        email: user.email,
      },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Logout user
export const logout = async (req, res) => {
  try {
    // Clear JWT cookie (if using cookies)
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only HTTPS in prod
      sameSite: process.env.NODE_ENV === "production"?
      'none': 'strict',
    });

    return res.json({success: true, message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Send verification OTP to the user's Email
export const sendVerifyOtp = async (req, res) => {

    try{
        const {userId} = req.body;
        const user = await userModel.findById(userId);

        if(user.isAccountVerified){
            return res.status(400).json({success: false, message: "Account already verified"});
        }

        // Generate OTP
        const otp = String(Math.floor(100000 + Math.random() * 900000));

        // Save OTP to user record (you need to implement this)
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 15 * 60 * 1000; // OTP valid for 15 minutes
        await user.save();

        // Send OTP email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Your OTP Code",
            text: `Your OTP code is: ${otp} , verify your account using this OTP.`,
        };

        await transporter.sendMail(mailOptions);
            
            console.log("Email sent:", user.email);

        return res.json({ success: true, message: "OTP sent successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Verify Account
export const verifyEmail = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
      return res
        .status(400)
        .json({ success: false, message: "User ID and OTP are required" });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid OTP" });
    }

    if (user.verifyOtpExpireAt < Date.now()) {
      return res
        .status(400)
        .json({ success: false, message: "OTP expired" });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;
    await user.save();

    return res.json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Check if user is Authenticated

export const isAuthenticated = async(req, res, next) => {
  try{
return res.json({success: true});
  }catch(error){
    res.json({success: false, message: error.message});
  }
};

// Send Password Reset OTP
export const sendResetOtp = async (req, res) => {
  const { email } = req.body;

    if(!email){
      return res.status(400).json({ success: false, message: "Email is required" });
    }

  try {
    
    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Generate OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    // Save OTP to user record (you need to implement this)
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
    await user.save();

    // Send OTP email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Your Password Reset OTP",
      text: `Your OTP code is: ${otp} , use this OTP to reset your password.`,
    };

    await transporter.sendMail(mailOptions);

    console.log("Email sent:", user.email);

    return res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    return res.status(500).json({success: false, message: error.message });
  }
};

// Reset user Password
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if ( user.resetOtp === "" || user.resetOtp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (user.resetOtpExpireAt < Date.now()) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;
    await user.save();

    return res.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
