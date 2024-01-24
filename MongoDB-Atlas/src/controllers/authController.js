const prisma = require("../config/prisma");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


const register = async (req, res) => {
  const { username, password, email } = req.body;
  // Check if the user already exists

  let user = await prisma.user.findUnique({
    where: {
      username
    }
  })
  if (user) {
    return res.status(409).json({ message: 'User already exists' });
  } 

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    let user = await prisma.user.create({
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

  let user = await prisma.user.findUnique({
    where: {
      username
    }
  })
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const accessToken = jwt.sign({ username: user.username, id: user.id }, process.env.JWT_SECRET);
  res.json({ accessToken });
};


module.exports = {register, login}