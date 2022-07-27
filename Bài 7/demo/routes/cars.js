//Viet code CRUD với mongodb su dung mongoose

//create - Tạo ra 1 cái oto
const express = require('express');
const router= express.Router();
const CarModel = require('../model/car.model');

//API get all cars
router.get('/', (req, res) => {
    const carName = req.query.name;
    CarModel.find({name: carName}).exec((err, cars) =>{
        if(err){
            res.send('ko thể lấy thông tin oto')
        } else {
            console.log('lấy thành công tất cả oto', cars);
            res.json(cars);
        }
    })
});

//API get by id
router.get('/:id', (res, req) => {
    CarModel.findOne({
        _id: req.params.id
    }).exec((err, car) => {
        if (err) {
            res.send('có lỗi xảy ra');
        } else {
            res.json(car);
        }
    })
})

//API create new car
router.post('/', (req, res) =>{
    const car = new CarModel();
    car.name = req.body.name;
    car.manufacturer = req.body.manufacturer;
    car.price = req.body.price;

    car.save((err, carObject) => {
        if(err) {
            res.send('Lỗi lưu thông tin oto')
        } else {
            console.log('Lưu thông tin oto thành công', carObject);
            res.send(car)
        }
    })
})

// API update by id
router.put('/:id', (req, res) => {
    CarModel.findOneAndUpdate(
        {
            _id: req.params.id
        }, 
        {
            $set: { name: req.body.name }
        }, 
        {upsert: true}, 
        (error, car) => {
              if(error) {
                res.send('Có lỗi xảy ra khi update')
              } else {
                res.send(car);
              }
        }
    )
});
module.exports = router;