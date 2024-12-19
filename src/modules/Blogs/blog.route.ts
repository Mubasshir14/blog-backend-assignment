import express from 'express';
import { BlogController } from './blog.controller';
import validateRequest from '../../app/middlewares/validateRequest';
import { BlogValidation } from './blog.validation';
import auth from '../../app/middlewares/auth';

const router = express.Router();

router.post(
  '/',
  validateRequest(BlogValidation.createBlogValidationSchema),
  auth('user'),
  BlogController.createBlogIntoDB,
);
router.patch(
  '/:id',
  validateRequest(BlogValidation.updateBlogValidationSchema),
  auth('user'),
  BlogController.updateBlogFromDB,
);
router.delete('/:id', auth('user'), BlogController.delteBlogFromDB);
router.get('/', BlogController.getAllBlogFromDB);

export const BlogRoutes = router;
