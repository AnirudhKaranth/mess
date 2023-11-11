import Menu from "../models/Menu.js"
import Food from "../models/Food.js"
// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'

// const JWT_SECRET = 'supasecreto'

// ROUTE 1: show menu items using: POST '/menu'
export const showMenu = async (req, res) => {
    try {
      const menuItems = await Menu.findAll();
      

      res.json(menuItems);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

