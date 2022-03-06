const express = require("express");
const {
    registerUser,
    userLogin,
    createPost,
    myProfile,
    logout,
} = require("../controllers/AuthController");
const { verifyToken } = require("../middleware/verifyToken");
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(userLogin);

router.route("/logout").get(logout);

router.route("/post").post(verifyToken, createPost);

router.route("/me").get(verifyToken, myProfile);

module.exports = router;
