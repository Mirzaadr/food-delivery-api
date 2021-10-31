const messages = {
  emptyFirstName: 'First name is required',
  minFirstName: 'First name length must be greater than 3 characters',
  maxFirstName: 'First name length must be less than 30 characters',
  invalidFirstName: 'First name must contain only characters. Symbols and numbers not allowed',
  
  emptyLastName: 'Last name is required',
  minLastName: 'Last name length must be greater than 3 characters',
  maxLastName: 'Last name length must be less than 30 characters',
  invalidLastName: 'Last name must contain only characters. Symbols and numbers not allowed',
  
  emptyPhone: 'Phone number is required',
  minPhone: 'Phone number length must be 13',
  maxPhone: 'Phone number length must be 13',
  invalidPhone: 'Phone number must include the country code.',

  emptyAddress: 'Address is required',

  emptyPassword: 'Password is required',
  minPassword: 'Password length must be greater than 6',
  maxPassword: 'Password length must be less than 20',
  invalidPassword: 'Password must include at least a symbol and a number.',

  signupConflict: 'Phone number already registered. Please use different number.',
  otpMessage: 'Your Verification Code is',
  signupSuccessfull: 'Account created successfully',
  
  emptyOTP: 'Please provide the OTP sent to your phone',
  invalidOTP: 'OTP must be a 6 digit number',
  wrongOTP: 'Inavlid OTP! please try again',

  verifySuccessful: 'Verification successful',

  invalidRequest: 'Invalid request, token not found',
  invalidToken: 'Invalid Token, please login and try again',
  resendOTPSuccessful: 'OTP sent successfully'
};

export default messages;
