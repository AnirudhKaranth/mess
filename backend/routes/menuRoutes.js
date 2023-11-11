// routes/menu.js

import express from 'express'
// const Menu = require('../models/Menu');
import { showMenu } from '../controllers/menuController.js'

const router = express.Router();

// Get all menu items
router.get('/menu',showMenu)

export default router