const Joi = require("joi");

const Post_User_Schema = Joi.object({
    username: Joi.string()
        .min(3)
        .regex(/^[a-zA-Z0-9]*$/)
        .message("No spaces allowed")
        .required(),
    mobileNumber: Joi.number()
        .min(1000000000)
        .message("Mobile Number must be 10 digits")
        .max(9999999999)
        .message("Mobile Number must be 10 digits"),
    email: Joi.string().min(6).required().email(),
    address: Joi.string(),
});

module.exports = Post_User_Schema;
