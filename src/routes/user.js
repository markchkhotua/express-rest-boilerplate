import {Router} from 'express';
import {user} from '../controllers';
import {routes} from '../config';

const router = Router();

router.post(routes.user.create, user.create);
router.put(routes.user.update, user.update);
router.delete(routes.user.delete, user.delete);
router.get(routes.user.list, user.list);
router.get(routes.user.show, user.show);

export default router;
