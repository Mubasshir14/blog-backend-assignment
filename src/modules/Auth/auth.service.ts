import httpStatus from 'http-status';
import AppError from '../../app/errors/AppError';
import { TUser } from '../User/user.interface';
import { User } from '../User/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';
import config from '../../app/config';

const userRegistrationIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const userLoginIntoDB = async (payload: TLoginUser) => {
  const user = await User.isUserExists(payload?.email);

  if (!user) {
    throw new AppError(401, 'Invalid credentials');
  }

  if (user?.isBlocked) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized User');
  }

  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(401, 'Invalid credentials');
  }

  const jwtPayload = {
    email: user.email as string,
    role: user.role as string,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    token: accessToken,
  };
};

export const AuthUserService = {
  userRegistrationIntoDB,
  userLoginIntoDB,
};
