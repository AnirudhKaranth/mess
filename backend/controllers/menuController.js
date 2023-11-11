import Menu from "../models/Menu.js"
import Food from "../models/Food.js"
// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'
// const JWT_SECRET = 'supasecreto'

// ROUTE 1: show menu items using: POST '/menu'
export const showMenu = async (req, res) => {
    try {
      const menuItems = await Menu.findAll({
        include: [
          {
            model: Food,
            attributes: ['Fname'], // Only select the 'fname' attribute from Food
          },
        ],
      });
  
      // Extract relevant fields from Menu and Food models
      // const menuData = menuItems.map(item => ({
      //   ...item.get(), // Include all fields from the Menu model
      //   Fname: item.Food.Fname, // Include 'fname' from the associated Food model
      // }));
      
      res.json(menuItems);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

