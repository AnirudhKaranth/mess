import express from 'express'

import { addUser, loginUser } from '../controllers/userController.js'

const router = express.Router()

router.post('/adduser',addUser)

router.post('/loginuser',loginUser)


export default router