import Staff from "../models/Staff.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const JWT_SECRET = 'supasecreto'

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
  
