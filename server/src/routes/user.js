import { Router } from 'express'
import * as userController from '../controllers/user'
const User = Router()

User.get('/', userController.getUsers)

User.get('/:id', userController.getUser)

User.post('/', userController.createNewUser)

User.patch('/:id', userController.updateOneUser)

User.delete('/:id', userController.deleteOneUser)

export default User