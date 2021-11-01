import dotenv from 'dotenv';
import models from '../models';
import misc from '../../helpers/misc';
import roles from '../../utils/roles';

dotenv.config();

const { User } = models;
const { generateHashPassword, generateOTP } = misc;
const { ADMIN } = roles;

const createAdmin = async () => {
  const password = await generateHashPassword(process.env.ADMIN_PASSWORD);
  const otpCode = await generateOTP();
  const adminData = {
    firstName: 'Jane',
    lastName: 'Doe',
    phoneNumber: process.env.ADMIN_PHONE,
    password: password,
    address: 'KN 2 St, 80, 7th Floor, 4',
    otp: otpCode,
    status: true,
    role: ADMIN,
  };
  await User.findOrCreate({
    where: {
      phoneNumber: adminData.phoneNumber,
      role: ADMIN,
    },
    defaults: adminData,
  });
};

createAdmin();

export default createAdmin;