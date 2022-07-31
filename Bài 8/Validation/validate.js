const Joi = require('joi');

const registerValidation = function(data) {
    const Schema = Joi.object({
        name: Joi.string().min(5).required(),
        email: Joi.string().email().min(6).required(),
        age: Joi.number().required(),
        address: Joi.string().required(),
        phone: Joi.number().min(10).required(),
        email: Joi.string().min(5).required(),
        gender: Joi.string().required(),
        password: Joi.string().min(6).required(),
    });
    return Schema.validate(data);
}

const loginValidation = function (data) {
    const Schema = Joi.object({
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(6).required(),
    });
    return Schema.validate(data);
}

const productValidation = function (data) {
    const Schema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        amount: Joi.number().required()
    });
    return Schema.validate(data);
}
module.exports.productValidation = productValidation;
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;