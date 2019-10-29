import {Router} from 'express';
import {auth} from '../controllers';
import {routes} from '../config';

const router = Router();

router.post(routes.auth.signIn, auth.signIn);
router.get(routes.auth.checkToken, auth.checkToken);

export default router;
