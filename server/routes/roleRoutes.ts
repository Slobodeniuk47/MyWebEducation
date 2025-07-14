// server/routes/roleRoutes.ts
import { Router } from 'express';
import { RoleController } from '../api/controllers/roleController';

const router = Router();

router.post('/create', RoleController.create);
router.put('/updateById/:id', RoleController.update);
router.delete('/deleteById/:id', RoleController.delete);
router.get('/getAll', RoleController.getAll);
router.get('/getById/:id', RoleController.getById);

export default router;
