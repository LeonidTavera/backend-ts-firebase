import { UserRepository } from '../repositories/user.repository'
import { User } from '../models/user.model'

export const UserService = {
    async create(user: User): Promise<string> {
        return UserRepository.create(user)
    },
    async update(id: string, user: Partial<User>): Promise<void> {
        return UserRepository.update(id, user)
    },
    async delete(id: string): Promise<void> {
        return UserRepository.delete(id)
    },
    async getAll(): Promise<User[]> {
        return UserRepository.getAll()
    },
    async getByID(id: string): Promise<User | null> {
        return UserRepository.getById(id)
    },
    async getUserName(username: string): Promise<User | null> {
        return UserRepository.getByUsername(username)
    },
    // Aquí se ha cambiado el tipo de retorno a User[] | null
    async getByRol(rol: string): Promise<User[] | null> {
        return UserRepository.getByRol(rol)
    }
}
