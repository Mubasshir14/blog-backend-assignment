import { RequestHandler } from 'express';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { AuthUserService } from './auth.service';

const userRegistration: RequestHandler = catchAsync(async (req, res) => {
  const result = await AuthUserService.userRegistrationIntoDB(req.body);
  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: 201,
    data: result,
  });
});

const userLogin: RequestHandler = catchAsync(async (req, res) => {
  const result = await AuthUserService.userLoginIntoDB(req.body);
  sendResponse(res, {
    success: true,
    message: 'Login successful',
    statusCode: 200,
    data: result,
  });
});

export const AuthUserController = {
  userRegistration,
  userLogin,
};
