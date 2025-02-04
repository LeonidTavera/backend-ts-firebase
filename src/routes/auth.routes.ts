import { Router } from "express"
import {authController} from '../controllers'

const router = Router ()

router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.get('/user', authController)

export default router

