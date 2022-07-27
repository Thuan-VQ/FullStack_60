const express = require('express');
const router = express.Router();
const UserModel = require('../model/user.model');

// create user
router.post('/', (req, res) => {
  const user = new UserModel();
  user.name = req.body.name;
  user.age = req.body.age;
  user.address = req.body.address;
  user.gender = req.body.gender;
  user.phoneNumber = req.body.phoneNumber;
  user.email = req.body.email;

  user.save((err, obj) => {
    if (err) {
      console.log(err);
      res.send('Lỗi lưu thông tin user')
    } else {
      console.log('Lưu thông tin user thành công', obj);
      res.send(user)
    }
  })
})

// get ALL user
router.get('/', (req, res) => {
  UserModel.find().exec((err, user) => {
    if (err) {
      res.send('ko thể lấy thông tin user')
    } else {
      res.json(user);
    }
  })
});

// update by ID
router.put('/:id', (req, res) => {
  UserModel.findByIdAndUpdate(
    {
      _id: req.params.id
    },
    {
      $set: {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address,
        gender: req.body.gender,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email
      }
    },
    (error, obj) => {
      if (error) {
        res.send('Có lỗi xảy ra khi update')
      } else {
        res.send(obj)
      }
    }
  )
});

// update by phoneNumber
router.put('/', (req, res) => {
  const userNumber = req.query.phoneNumber;
  UserModel.findOneAndUpdate(
    { userNumber },
    {
      $set: {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address,
        gender: req.body.gender,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email
      }
    },
    (error, obj) => {
      if (error) {
        res.send('Có lỗi xảy ra khi update')
      } else {
        res.send(obj)
      }
    }
  )
})

// delete by ID
router.delete('/:id', (req, res) => {
  UserModel.findByIdAndDelete(
    {
      _id: req.params.id
    },
    (error, obj) => {
      if (error) {
        res.send('Có lỗi xảy ra khi delete')
      } else {
        res.send(obj)
      }
    }
  )
})
module.exports = router;