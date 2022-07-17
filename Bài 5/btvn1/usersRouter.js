const express =  require('express');
const usersRouter = express.Router();
const Joi = require('joi');

const users = [
   { id: 1, 
    name: 'Nguyen Tuan Anh', 
    phoneNumber: '0986780985', 
    email: 'email@gmail.com', 
    gender: 'male',
    age: 31
    },
]

usersRouter.get('/', function(req, res){
    res.send(users);
});

usersRouter.post('/', function(req, res){
    const { error } = validateUsers(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const newUser = {
        id: `${users.length + 1}`,
        name: req.body.name,
    }
    users.push(newUser)
    res.send(users)
});

usersRouter.put('/', function(req, res){
    users.map((item) => {
        if(item.id === req.body.id) {
            item.name = req.body.name;
        }
    })
    res.send(users)
});

usersRouter.delete('/', function(req, res){
    const newUsers = users.filter(item => item.id != req.body.id) 
    res.send(newUsers)
});

function validateUsers(user) {
    const schema = Joi.object({
        name: Joi.string().alphanum().min(15).required(),
        phoneNumber: Joi.number().min(10).max(12).required(),
        email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] }}),
        gender: Joi.array().required().items(Joi.string().valid('male', 'female', 'undefined')),
        age: Joi.number().max(200).required()
    });
    return schema.validate(user);
}

module.exports = usersRouter;