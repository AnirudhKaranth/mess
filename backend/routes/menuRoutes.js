// routes/menu.js

import express from 'express'
// const Menu = require('../models/Menu');
import { showMenu, updateMenu, voteMenu, foodNames } from '../controllers/menuController.js'

const router = express.Router();

// Get all menu items
router.get('/menu',showMenu)
router.put('/updatemenu',updateMenu)
router.post('/votemenu',voteMenu)
// router.post('/foodoptions',foodOptions)
router.get('/foodnames',foodNames)


export default router