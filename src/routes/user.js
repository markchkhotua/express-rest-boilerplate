import {Router} from 'express';
import {userController} from '../controllers';

const router = Router();

router.post('/create', userController.create.create);
router.post('/create-bulk', userController.create.bulkCreate);

router.put('/update', userController.update.update);
router.put('/update-bulk', userController.update.bulkUpdate);

export default router;
