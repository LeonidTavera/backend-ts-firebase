import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config()

export const AuthMiddleware = {
    verifyToken(req: Request, res: Response, next: NextFunction): void { // No devolvemos nada explícitamente
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            res.status(401).json({
                error: 'Token no proporcionado'
            })
            return
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
            req.body.user = decoded; // Añadimos la información del usuario al body
            next(); // Llamada a next() sin retorno explícito
        } catch (error) {
            res.status(401).json({
                error: 'Token inválido o expirado'
            });
        }
    }
}
