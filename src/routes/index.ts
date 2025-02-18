import { Router, Request, Response } from "express"
import authRoutes from './auth.routes'
import userRoutes from './user.routes'

const router = Router()

router.get('/', (req: Request, res: Response) => {
   res.json({
    'message': ' Bienvenido al servidor 🚀'
   }) 
})

router.use('/auth,', authRoutes)
router.use('/user', userRoutes)

export default router

