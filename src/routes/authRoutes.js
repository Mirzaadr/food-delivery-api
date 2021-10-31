import express from "express";
import authController from '../controllers/authentication';
import authMiddleware from '../middlewares/authentication';

const { signup, verify, resendOTP, login, logout } = authController;
const { 
  validateSignup, 
  isUserRegistered, 
  validateVerifyOTP, 
  checkUserToken, 
  checkOTP,
  validateLogin,
  checkLogin, 
} = authMiddleware;

const authRoutes = express.Router();

authRoutes.post('/signup', validateSignup, isUserRegistered, signup);
authRoutes.get('/verify', validateVerifyOTP, checkUserToken, checkOTP, verify);
authRoutes.get('/verify/retry', checkUserToken, resendOTP);
authRoutes.post('/login', validateLogin, checkLogin, login);
authRoutes.get('/logout', checkUserToken, logout);

export default authRoutes;
