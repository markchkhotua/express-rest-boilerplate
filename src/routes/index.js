import {Router} from 'express';
import userRoutes from './user';
import {routes} from '../config';

const router = Router();

/**
 * Default response string on root path
 */
router.get('/', (req, res, next) => {
  res.send('Welcome to Express Rest Boilerplate');
});

router.get(routes.user.root, userRoutes);

export default router;
