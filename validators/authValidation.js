const Joi = require("joi");

const registration_Schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
});

const login_Schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
});

module.exports = {
    registration_Schema,
    login_Schema,
};
