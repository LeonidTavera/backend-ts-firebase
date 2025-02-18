import { getSalt } from 'bcryptjs'
import {db }from '../config/firebase'
import { User } from '../models/user.model'

const USER_COLLECTION = 'usuarios-ts'
export const UserRepository={
    async create (user: User):Promise<string>{
      try {
        const userExist = await db.collection(USER_COLLECTION).where('usuario', '==', user.usuario).get()
        if (!userExist.empty) {
          throw new Error ('El usuario ya existe')
        }

        const duplicateName = await db.collection(USER_COLLECTION)
        .where('nombre', '==', user.nombre)
        .where('apaterno', '==', user.apaterno)
        .where('amaterno', '==', user.amaterno)
        .get()

        if (!duplicateName.empty) {
          throw new Error ('El usuario con el mismo nombre ya existe')
        }

        const usuerRef = db.collection(USER_COLLECTION).doc()
        await usuerRef.set(user)
        return usuerRef.id
      } catch (error: any) {
        throw new Error(`Error al creaar el usuario ${error.message}`)
      }
    },
    async update(id: string, user: Partial<User>): Promise <void> {
        await db.collection(USER_COLLECTION).doc(id).update(user)
    },
    async delete(id: string): Promise <void> {
        await db.collection(USER_COLLECTION).doc(id).delete()
    },
    async getAll (): Promise<User[]> {
        const users = await db.collection(USER_COLLECTION).get()
        return users.docs.map((doc) => ({ id:doc.id, ...doc.data() })) as User[] 
        },
    async getById(id: string): Promise<User |  null> {
      const user = await db.collection(USER_COLLECTION).doc(id).get() 
      return user.exists ? ({id: user.id, ...user.data()} as User): null
    },
    async getByUsername(username: string): Promise<User |  null> {
      const user = await db.collection(USER_COLLECTION).where('usuario','==', username).get() 
      return !user.empty ? ({id: user.docs[0].id, ...user.docs[0].data()} as User): null
    },
    async getByRol(rol: string): Promise<User[]> {
      const users = await db.collection(USER_COLLECTION).where('rol','==', rol).get() 
      return users.docs.map((doc) => ({ id:doc.id, ...doc.data() })) as User[]
    }
}
