import { Request, Response } from "express";
import { UserService } from '../services/user.service';

export const userController = {
    async create(req: Request, res: Response): Promise<void> { 
        try {
            const id = await UserService.create(req.body);
            res.status(200).json({ id });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    },

    async update(req: Request, res: Response): Promise<void> {
        try {
            if (!req.params.id) {
                res.status(400).json({ error: 'ID del usuario es requerido' });
                return;
            }
            await UserService.update(req.params.id, req.body);
            res.status(200).json({ mensaje: 'Usuario actualizado correctamente' });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    },

    async delete(req: Request, res: Response): Promise<void> {
        try {
            if (!req.params.id) {
                res.status(400).json({ error: 'ID del usuario es requerido' });
                return;
            }
            await UserService.delete(req.params.id);
            res.status(200).json({ mensaje: 'Usuario borrado correctamente' });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    },

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const users = await UserService.getAll();
            res.status(200).json({ users });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    },

    async getById(req: Request, res: Response): Promise<void> {
        try {
            if (!req.params.id) {
                res.status(400).json({ error: 'ID del usuario es requerido' });
                return;
            }
            const user = await UserService.getByID(req.params.id);
            if (!user) {
                res.status(404).json({ error: 'Usuario no encontrado' });
                return;
            }
            res.status(200).json({ user });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    },

    async getByUsername(req: Request, res: Response): Promise<void> {
        try {
            if (!req.params.username) {
                res.status(400).json({ error: 'Nombre de usuario es requerido' });
                return;
            }
            const user = await UserService.getUserName(req.params.username);
            if (!user) {
                res.status(404).json({ error: 'Usuario no encontrado' });
                return;
            }
            res.status(200).json({ user });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    },

    async getByRol(req: Request, res: Response): Promise<void> {
        try {
            if (!req.params.rol) {
                res.status(400).json({ error: 'Rol es requerido' });
                return;
            }
            const users = await UserService.getByRol(req.params.rol);
            res.status(200).json({ users });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
};
