//A library for validation
const Joi = require('@hapi/joi');

//Register Validation
const registerValidation = (data) => {
    //Validation Schema
    const schema = {
        username: Joi.string().min(5).required(),
        password: Joi.string().min(6).required(),
        role: Joi.string().required()
    }
    return Joi.validate(data, schema);
}

//Login Validation
const loginValidation = (data) => {
    //Validation Schema
    const schema = {
        username: Joi.string().min(5).required(),
        password: Joi.string().min(6).required(),
    }
    return Joi.validate(data, schema);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
