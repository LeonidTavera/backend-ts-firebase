import {Router} from 'express'
import {userController} from '../controllers/user.controller'
import{AuthMiddleware} from '../middleware/auth.middelware'

const router = Router ()

// Indicar que vamos a usar el middelware
router.use(AuthMiddleware.verifyToken)

// Definicion de Rutas para el usuario
router.post('/create', userController.create)
router.put('/update:id', userController.update)
router.delete('/delete:id', userController.delete)
router.get('/getall', userController.getAll)
router.get('/getbyid/:id', userController.getById)
router.get('/getbyusername/:id', userController.getByUserName)
router.get('/getbyrol/:rol', userController.getByRol)

export default router