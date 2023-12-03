import Staff from "../models/Staff.js";
import Menu from "../models/Menu.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const JWT_SECRET = 'supasecreto'

// ROUTE 2: Staff login '/loginstaff'
export const loginStaff = async(req, res, next)=>{
  
    let success = false;
    const { Sname, Spasswd } = req.body;
    try {
      let staff = await Staff.findOne({where: {Sname: Sname}}) //search Uname
      if(!staff){
        success = false
        return res.status(400).send('Invalid credentials')
      }
    //   const passwdCompare = await bcrypt.compare(Spasswd,staff.Spasswd) //compare Upasswd
      console.log(staff.Spasswd);
    //   if(!passwdCompare){
      if(Spasswd !== staff.Spasswd){
      // return res.status(400).send('Invalid ')
      success = false
      
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
      }   
      
      const data = { //send payload if both creds are correct
        user:{
          Uid: staff.Sid,
          Uname: staff.Sname,
          role: staff.role
        }
      }
      
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ data, success, authtoken }) //disp details to console
  
    } catch (err) {
      return res.status(500).send('Internal server error');
    }
  }
  
// ROUTE 2: Edit menu for staff '/editmenu'
export const editMenu = async(req, res, next)=>{
 
  try {
    const { selectedDay, selectedTime, selectedFood } = req.body;

    // Find the menu entry to update based on selected day and time
    const existingMenu = await Menu.findOne({
      where: {
        Day: selectedDay,
        Timeslot: selectedTime,
      },
    });

    if (!existingMenu) {
      return res.status(404).json({ success: false, error: 'Menu not found' });
    }

    // Update the menu entry
    await existingMenu.update({
      Fid: selectedFood,
    });

    // Send a success response
    res.json({ success: true, menu: existingMenu });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

