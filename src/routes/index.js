import {Router} from 'express';
import userRoutes from './user';

const router = Router();

/**
 * Default response string on root path
 */
router.get('/', (req, res, next) => {
  res.send('Welcome to Express Rest Boilerplate');
});

router.get('/user', userRoutes);

export default router;
