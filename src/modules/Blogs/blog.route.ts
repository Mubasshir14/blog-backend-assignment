import express from 'express';
import { BlogController } from './blog.controller';
import validateRequest from '../../app/middlewares/validateRequest';
import { BlogValidation } from './blog.validation';
import auth from '../../app/middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(BlogValidation.createBlogValidationSchema),
  BlogController.createBlogIntoDB,
);

router.patch(
  '/:id',
  auth(USER_ROLE.user),
  validateRequest(BlogValidation.updateBlogValidationSchema),
  BlogController.updateBlogFromDB,
);

router.delete('/:id', auth(USER_ROLE.user), BlogController.delteBlogFromDB);

router.get('/', BlogController.getAllBlogFromDB);

export const BlogRoutes = router;
