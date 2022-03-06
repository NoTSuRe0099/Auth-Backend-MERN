const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {
    registration_Schema,
    login_Schema,
} = require("../validators/authValidation");

exports.registerUser = async (req, res, next) => {
    try {
        const result = await registration_Schema.validateAsync(req.body);

        if (!result.error) {
            const { email, password, name } = result;
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({
                    success: false,
                    message: "Email already exists",
                });
            } else {
                user = await User.create({
                    name,
                    email,
                    password,
                });

                const token = user.generateToken();
                const options = {
                    expires: new Date(Date.now() + 60 * 3000),
                    httpOnly: true,
                };
                res.status(200).cookie("token", token, options).json({
                    success: true,
                    user,
                    token,
                });
            }
        }
    } catch (error) {
        if (error.isJoi) {
            res.status(400).send({
                status: false,
                message: error.details[0].message,
                error,
            });
        }
        next(error);
    }
};

exports.userLogin = async (req, res, next) => {
    try {
        //? if user not found

        const result = await login_Schema.validateAsync(req.body);

        if (!result.error) {
            const { email, password } = result;
            const user = await User.findOne({ email }).select("+password");
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "Email not found",
                });
            }

            const isMatch = await user.comparePassword(password);

            if (!isMatch) {
                return res.status(400).json({
                    success: false,
                    message: "Password is incorrect",
                });
            }

            const token = user.generateToken();
            const options = {
                expires: new Date(Date.now() + 60 * 3000),
                httpOnly: true,
            };
            res.status(200).cookie("token", token, options).json({
                success: true,
                message: "User Logged In Successfully",
                user,
                token,
            });
        }
    } catch (error) {
        if (error.isJoi) {
            res.status(400).send({
                success: false,
                message: error.details[0].message,
            });
        }
        next(error);
    }
};

exports.createPost = (req, res) => {
    res.json({
        message: "post created...",
        user: res.user,
    });
};

exports.myProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: error,
        });
    }
};

exports.logout = async (req, res) => {
    try {
        res.status(200)
            .cookie("token", null, {
                expires: new Date(Date.now() - 1),
                httpOnly: true,
            })
            .json({
                success: true,
                message: "User Logged Out Successfully",
            });
    } catch (error) {
        res.status(400).send({
            message: error,
        });
    }
};
