import express from 'express';
import { AdminController } from './admin.controller';
import auth from '../../app/middlewares/auth';

const router = express.Router();

router.patch(
  '/users/:id/block',
  auth('admin'),
  AdminController.blockUserFromDB,
);

router.delete('/blogs/:id', auth('admin'), AdminController.deleteBlogFromDB);

export const AdminRoutes = router;
