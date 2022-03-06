const New_User = require("../Models/NewUser");
const Post_User_Schema = require("../validators/PostsValidator");

exports.Post_New_User = async (req, res, next) => {
    try {
        const result = await Post_User_Schema.validateAsync(req.body);

        if (!result.error) {
            New_User.findOne({ email: result.email }, (err, user) => {
                if (user) {
                    return res.status(400).json({
                        success: false,
                        message: "Email already exists",
                    });
                } else {
                    const newUser = {
                        username: result.username,
                        mobileNumber: result.mobileNumber,
                        email: result.email,
                        address: result.address,
                    };
                    New_User.create(newUser)
                        .then((user) => {
                            res.status(200).json({
                                message: "User Created Successfully",
                                data: user,
                            });
                        })
                        .catch((err) => {
                            res.status(400).json({
                                message: "Error",
                                error: err,
                            });
                        });
                }
            });
        }
    } catch (error) {
        if (error.isJoi) {
            res.status(400).send({
                status: "error",
                message: error.details[0].message,
            });
        }
        next(error);
    }
};

exports.getAllUser = async (req, res, next) => {
    try {
        await New_User.find()
            .then((user) => {
                res.status(200).json({
                    message: "All Users",
                    data: user,
                });
            })
            .catch((err) => {
                res.status(400).json({
                    message: "Error",
                    error: err,
                });
            });
    } catch (error) {
        next(error);
    }
};
