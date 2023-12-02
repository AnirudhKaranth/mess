import express from 'express'

import { addUser, loginUser } from '../controllers/userController.js'
import { loginStaff } from '../controllers/messControllers.js'

const router = express.Router()

router.post('/adduser',addUser)

router.post('/loginuser',loginUser)

router.post('/loginstaff', loginStaff)


export default router