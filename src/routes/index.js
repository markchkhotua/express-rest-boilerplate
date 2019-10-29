import {Router} from 'express';
import userRoutes from './user';
import authRoutes from './auth';
import {routes} from '../config';

const router = Router();

/**
 * Default response string on root path
 */
router.get('/', (req, res, next) => {
  res.send('Welcome to Express Rest Boilerplate');
});

router.use(routes.user.root, userRoutes);
router.use(routes.auth.root, authRoutes);

export default router;
