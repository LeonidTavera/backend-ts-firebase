import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { AuthMiddleware } from '../middleware/auth.middelware';

const router = Router();

// Definición de rutas para el usuario
router.post('/create', userController.create);
router.put('/update/:id', AuthMiddleware.verifyToken, userController.update); // Corregido el endpoint para que use `:id`
router.delete('/delete/:id', AuthMiddleware.verifyToken, userController.delete); // Corregido el endpoint para que use `:id`
router.get('/getall', userController.getAll);
router.get('/getbyid/:id', userController.getById);
router.get('/getbyusername/:username', userController.getByUsername); // Corregido el parámetro de la ruta
router.get('/getbyrol/:rol', userController.getByRol);

export default router;
