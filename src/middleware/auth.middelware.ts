import {Request, Response, NextFunction} from 'express'
import jwt, { verify } from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config()

export const AuthMiddleware = {
    verifyToken(req: Request, res: Response, netx: NextFunction){
        const token = req.headers.authorization?.split (' ')[1]
        if (!token){
            return res.status(401).json({
                error: 'Token no proporcionado'
            })
        }

        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
          req.body.use = decoded
          netx() 
        } catch (error) {
            return res.status(401).json({
                error: 'Token Invalido o Expirado'
            })
        }
    }
}