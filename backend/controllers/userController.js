import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = 'supasecreto'

// ROUTE 1: Create a User using: POST '/createuser'
export const addUser = async(req, res, next)=>{
  try{
    let user = await User.findOne({where: {Uname: req.body.Uname}}) //check if exists
    if(user){
      return res.status(400).json({error:'user already  exists'})
  }
  const salt = await bcrypt.genSalt(10); //generate hash
  const secPass = await bcrypt.hash(req.body.Upasswd, salt);
  let data = {
    "Uname": req.body.Uname,
    "Upasswd": secPass,
    "Mid": req.body.Mid
  }
  // const {userId} = req.params
  User.create(data); //insert into user
  // res.status(201).json(data);
  // res.send({msg:'user added'})

  const authtoken = jwt.sign(data, JWT_SECRET);
  res.json({data, authtoken}) 

  } catch(error){
    console.error(error.message);
    res.status(500).send('some error occured');
  }
}

// ROUTE 2: Authenticate a User using: POST '/login'
export const loginUser = async(req, res, next)=>{

  const { Uname, Upasswd } = req.body;
  try {
    let user = await User.findOne({where: {Uname: Uname}}) //search Uname
    if(!user){
    return res.status(400).send('Invalid credentials')
    }
    const passwdCompare = await bcrypt.compare(Upasswd,user.Upasswd) //compare Upasswd
    if(!passwdCompare){
    return res.status(400).send('Invalid ')
    }   
    const data = { //send payload if both creds are correct
      user:{
        Uid: user.Uid
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({authtoken}) //disp details to console

  } catch (err) {
    return res.status(500).send('Internal server error');
  }
}



