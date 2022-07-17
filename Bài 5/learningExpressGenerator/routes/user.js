const express = require('express');
const router = express.Router();
const Joi = require('joi');


router.post('/', function(req,res){

    const { error } = validateUsers(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { body } = req;
    res.render('userInfo', {body});
});

function validateUsers(user) {
    const schema = Joi.object({
        firstName: Joi.string().alphanum().min(15).required(),
        lastName: Joi.string().alphanum().min(15).required(),
        phoneNumber: Joi.number().min(10).max(12).required(),
        email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] }}),
        gender: Joi.array().required().items(Joi.string().valid('male', 'female', 'undefined')),
        birthday: Joi.birthday().required()
    });
    return schema.validate(user);
}

module.exports = router;