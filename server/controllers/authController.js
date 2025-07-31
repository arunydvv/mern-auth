import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({
      success: false,
      message: "Missing Details in Body of the Request!",
    });
  }

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.json({
        success: false,
        message: "User Already Exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: process.env.NODE_ENV !== "development" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Sending welcome email
    const mailOptions = {
      from: process.env.SENDER_EMAIL, // Must match or be verified in SMTP provider
      to: email, // Recipient's email
      subject: "🎉 Welcome to the commumnity!",
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f4f4f4; border-radius: 8px;">
      <div style="background-color: #2b2d42; padding: 20px; border-radius: 8px 8px 0 0; color: white; text-align: center;">
        <h1>👋 Welcome to <span style="color: #fca311;">MernAuth</span>!</h1> 
      </div>
      <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 8px 8px;">
        <p style="font-size: 16px; color: #333;">Hey <strong>${email}</strong>,</p>
        <p style="font-size: 16px; color: #333;">
          We're excited to have you on board! Your account has been successfully created. 🎉
        </p>
        <p style="font-size: 16px; color: #333;">
          You're now part of a growing community of developers and creators.
        </p>
        <p style="font-size: 16px; color: #333;">
          If you have any questions or need help, feel free to reply to this email.
        </p>
        <hr style="margin: 30px 0;">
        <p style="font-size: 14px; color: #888; text-align: center;">
          &copy; ${new Date().getFullYear()} MernAuth. All rights reserved. 
        </p>
      </div>
    </div>
  `,
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and Password are Required",
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "Invalid Email",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: process.env.NODE_ENV !== "development" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "Logged In",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: process.env.NODE_ENV !== "development" ? "none" : "strict",
    });

    return res.json({
      success: true,
      message: "Logged Out",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// send verification email to user
export const sendVerificationOtp = async (req, res) => {
  try {
    const { userId } = req;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found!" });
    }

    if (user.isAccountVerified) {
      return res.json({ success: false, message: "Account already verified!" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const verifyOtpExpiresAt = Date.now() + 20 * 60 * 1000;

    await userModel.findByIdAndUpdate(userId, {
      verifyOtp: otp,
      verifyOtpExpiresAt: verifyOtpExpiresAt
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL, // Must match or be verified in SMTP provider
      to: user.email,
      subject: "Account Verification OTP",
      html: `
        <h2>Hello ${user.name || "User"},</h2>
        <p>Your OTP for verifying your account is:</p>
        <h1 style="color:#4CAF50;">${otp}</h1>
        <p>This OTP will expire in 20 minutes.</p>
        <br/>
        <p>If you didn’t request this, please ignore this email.</p>
        <p>Regards,<br/>Arun yadav</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
      message: "OTP sent to your email!",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};


export const verifyEmail = async (req, res) => {
  const { userId } = req
  const { otp } = req.body;

  if (!userId || !otp) {
    return res.json({
      success: false,
      message: "Missing userId or OTP",
    });
  }

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.verifyOtp || user.verifyOtp !== otp) {
      return res.json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (user.verifyOtpExpiresAt < Date.now()) {
      return res.json({
        success: false,
        message: "OTP has expired",
      });
    }

    await userModel.findByIdAndUpdate(userId, {
      isAccountVerified: true,
      verifyOtp: "",
      verifyOtpExpiresAt: 0,
    });

    return res.json({
      success: true,
      message: "Email verified successfully!",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//Check if user is Authenticated
export const isAuthenticated = async (req, res) => {
  try {
    return res.json({
      success: true,
      message: 'Successfully Authenticated'
    })

  }
  catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
}


export const sendResetOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({
      success: false,
      message: "Email is required",
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const resetOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const resetOtpExpiredAt = Date.now() + 20 * 60 * 1000;


    await userModel.findByIdAndUpdate(user._id, {
      resetOtp,
      resetOtpExpiredAt,
    });

    // console.log("OTP pushed to DB");

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password Reset OTP",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
            </style>
          </head>
          <body style="font-family: 'Inter', sans-serif; background-color: #f9f9f9; padding: 20px;">
            <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
              <h2 style="color: #333;">Hello ${user.name || "User"},</h2>
              <p style="font-size: 16px; color: #555;">You recently requested to reset your password. Your OTP for verification is:</p>
              <div style="text-align: center; margin: 30px 0;">
                <h1 style="font-size: 36px; color: #4CAF50; letter-spacing: 4px;">${resetOtp}</h1>
              </div>
              <p style="font-size: 14px; color: #999;">This OTP will expire in <strong>20 minutes</strong>.</p>
              <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
              <p style="font-size: 14px; color: #999;">If you didn’t request this, you can safely ignore this email.</p>
              <p style="font-size: 14px; color: #999;">Regards,<br/><strong>Arun yadav</strong></p>
            </div>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);


    return res.json({
      success: true,
      message: "Reset OTP sent to user",
    });
  } catch (error) {
    // console.error("Error in sendResetOtp:", error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};


export const resetPassword = async (req, res) => {

  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res.json({
      success: false,
      message: 'Otp / password / email are required'
    });
  }

  try {
    const user = await userModel.findOne({
      email
    })

    if (!user) {
      return res.json({
        success: false,
        message: 'User doesnt exist'
      });
    }

    if (user.resetOtp === "" || user.resetOtp !== otp) {
      return res.json({
        success: false,
        message: 'Invalid Otp'
      });
    }

    if (user.resetOtpExpiredAt < Date.now()) {
      return res.json({
        success: false,
        message: 'Otp Expired'
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);




    await userModel.findByIdAndUpdate(user._id, {
      resetOtp: '',
      resetOtpExpiredAt : 0,
      password: hashedPassword
      
    });


    return res.json({
      success: true,
      message: 'Password has been reset succesfully'
    });

  }
  catch (error) {
    return res.json({
      success: false,
      message: 'Your message here'
    });
  }




  
};