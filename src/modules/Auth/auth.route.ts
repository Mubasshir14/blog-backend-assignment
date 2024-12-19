import express from 'express';
import { AuthUserController } from './auth.controller';
import validateRequest from '../../app/middlewares/validateRequest';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/register',
  validateRequest(AuthValidation.userRegisterValidationSchema),
  AuthUserController.userRegistration,
);

router.post(
  '/login',
  validateRequest(AuthValidation.userLoginValidationSchema),
  AuthUserController.userLogin,
);

export const AuthRoutes = router;
