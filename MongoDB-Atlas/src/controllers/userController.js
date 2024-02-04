const prisma = require("../config/prisma");
const bcrypt = require('bcrypt');
const { json } = require("express");
var jwt = require('jsonwebtoken');


const register = async (req, res) => {
  const { username, password, email } = req.body;
  // Check if the user already exists

  let uname = await prisma.user.findUnique({
    where: {
      username
    }
  })
  let user_email = await prisma.user.findUnique({
    where: {
      email
    }
  })
  if (uname) {
    return res.status(409).json({ message: 'User already exists' });
  } else if (user_email) {
    return res.status(409).json({ message: 'Email already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {username, password: hashedPassword, email}
    })
    // res.json({user, info: "user was successfully created"})
    res.status(201).json({ info: 'User registered successfully' });

   }catch(err){
    res.status(400).json({err}) 
   }

}

const login = async (req, res) => {
  const { username, password } = req.body;
  try{
    let user = await prisma.user.findUnique({
      where: {
        username
      }
    })
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const accessToken = jwt.sign({ username: user.username, id: user.id }, process.env.JWT_SECRET,{ expiresIn: 120 });
    console.log(accessToken)
    // let token = JSON.stringify(accessToken)
    res.json({ accessToken });
  }catch(err){
    res.status(400).json(err)
  }
  
};

const deleteUser = async (req,res)=>{
  let {username} = req.body
  try{
    let user = await prisma.user.findUnique({
      where:{
        username: String(username)
      }
    })
    if (user){
      await prisma.user.deleteMany({
        where:{
          id: String(user.id)
        }
      })
      res.json({info: "user was successfully deleted"})
    }else{
      res.status(404).json({info: "data not found"})
    }
      
  }catch(err){
    res.status(404).json({info: "data not found"})
  }
}

module.exports = {
  register,
  login,
  deleteUser
}
