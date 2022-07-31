var express = require('express');
const User = require('../models/user_model');
const { registerValidation, loginValidation } = require('../Validation/validate');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyUserMiddleware = require('../middleware/auth_middleware');

// code API đăng kí người dùng
router.post('/register', async function(req, res){
  // Validate user
  const {error} = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Kiểm tra email có tồn tại chưa
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send('Email exists in database. Please choose other email');

  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // Tạo user
  const newUser = new User();
  newUser.name = req.body.name;
  newUser.email = req.body.email;
  newUser.age = req.body.age;
  newUser.address = req.body.address;
  newUser.gender = req.body.gender;
  newUser.phone = req.body.phone;
  newUser.password = hashPassword;

  try {
    const user = await newUser.save()
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
})



// code API login
router.post('/login', async function(req, res){
  const {error} = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //kiểm tra email có đúng k
  const userLogin = await User.findOne({email: req.body.email});
  if (!userLogin) return res.status(400).send("User not exist in database");

  //Kiểm tra password đúng k
  const passLogin = await bcrypt.compare(req.body.password, userLogin.password)
  if(!passLogin) return res.status(400).send("Password incorrect");

  //Generate chuỗi token
  const token = jwt.sign({_id: userLogin._id}, 'chuoibimatkdctietlo');
  res.header('auth-token', token).send(token);
});



// code API - trả về 1 string
  // code hàm để check - gắn vào middleware
  router.get('/', verifyUserMiddleware, function(req, res){
    res.send('Hello World');
  })

module.exports = router;
