import express from 'express'
import { isAuthenticated, login, logout, registerUser, resetPassword, resetPasswordByLink, sendResetLink, sendResetOtp, sendVerificationOtp, verifyEmail } from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';

const authRouter = express.Router();


authRouter
  .post("/register", registerUser)
  .post("/login", login)
  .post("/logout", logout)
  .post("/send-verify-otp", userAuth, sendVerificationOtp)
  .post("/verify-account", userAuth, verifyEmail)
  .post("/is-auth", userAuth, isAuthenticated)
  .post("/send-reset-otp", sendResetOtp)
  .post("/reset-password", resetPassword)
  .post("/send-reset-link", sendResetLink)
  .post("/reset-password-by-link", resetPasswordByLink);
  



export default authRouter;







