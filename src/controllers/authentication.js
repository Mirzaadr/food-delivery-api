import _ from 'lodash';
import statusCodes from '../utils/statusCodes';
import messages from '../utils/messages';
import misc from '../helpers/misc';
import services from '../services/services';
import models from '../database/models';
// import redisClient from '../config/redisClient';
import roles from '../utils/roles';

const {
  created,
  serverError,
  success,
  unauthorized,
} = statusCodes;
const {
  otpMessage,
  signupSuccessfull,
  verifySuccessful,
  resendOTPSuccessful,
  loginSuccessful,
  logoutSuccessful,
  loginUserWrongCredentials
} = messages;
const {
  successResponse,
  errorResponse,
  generateToken,
  generateOTP,
  sendOTP,
  generateHashPassword,
} = misc;
const { saveData, updatebyCondition } = services;
const { User } = models;
const { CUSTOMER } = roles;

export default class Authentication {
  static signup = async (req, res) => {
    try {
      const { firstName, lastname, phoneNumber, address, password } = req.body;

      // Hash password to avoid storing plain-text password in db
      const hashedPassword = await generateHashPassword(password);

      // generate OTP code of 6 random digits
      const otpCode = await generateOTP();

      // prepare user data to save to db
      const userObject = {
        firstName,
        lastname,
        phoneNumber,
        address,
        password: hashedPassword,
        otp: otpCode,
        role: CUSTOMER,
      };

      // save data in db
      const data = await saveData(User, userObject);

      // Send OTP code via SMS to user's phone number
      if (process.env.NODE_ENV === 'production') {
        await sendOTP(phoneNumber, `${otpMessage} ${otpCode}`);
      }
      // Prepare user data to return in response
      const userData = _.omit(data, ['id', 'password'])

      // Prepare data to include in our token
      const tokenData = _.pick(data, ['id', 'phoneNumber', 'status']);

      // Generate user's token
      const token = await generateToken(tokenData);

      return successResponse(res, created, signupSuccessfull, token, userData);
    } catch (error) {
      return errorResponse(res, serverError, error);
    }
  }

  static verify = async (req, res) => {
    try {
      const { phoneNumber } = req.userData;
      const condition = { phoneNumber };
      const data = { status: true };
      const { dataValues } = await updatebyCondition(User, data, condition);
      const updatedData = _.omit(dataValues, ['id', 'password', 'otp'])

      return successResponse(res, success, verifySuccessful, null, updatedData);
    } catch (error) {
      return errorResponse(res, serverError, error);
    }
  }

  static resendOTP = async (req, res) => {
    try {
      const { phoneNumber } = req.userData;
      
      const otpCode = await generateOTP();
      
      // Send OTP code via SMS to user's phone number
      if (process.env.NODE_ENV === 'production') {
        await sendOTP(phoneNumber, `${otpMessage} ${otpCode}`);
      }

      return successResponse(res, success, resendOTPSuccessful, null, null);
    } catch (error) {
      return errorResponse(res, serverError, error);
    }
  }

  static login = async (req, res) => {
    try {
      const tokenData = _.omit(req.userData, ['password', 'otp']);
      const token = await generateToken(tokenData);
      const data = _.omit(req.userData, ['id', 'password', 'otp']);
      return successResponse(res, success, loginSuccessful, token, data);
    } catch (error) {
      return errorResponse(res, serverError, error)
    }
  }
  
  static logout = async (req, res) => {
    try {
      const token = req.get('authorization').split(' ').pop();
      // redisClient.sadd('token', token);
      return successResponse(res, success, logoutSuccessful, null, null);
    } catch (error) {
      return errorResponse(res, unauthorized, loginUserWrongCredentials)
    }
  }
}