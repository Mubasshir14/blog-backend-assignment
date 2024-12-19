import { Router } from 'express';
import { AuthRoutes } from '../../modules/Auth/auth.route';
import { BlogRoutes } from '../../modules/Blogs/blog.route';
import { AdminRoutes } from '../../modules/Admin/admin.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
