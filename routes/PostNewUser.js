const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/verifyToken");
const { Post_New_User, getAllUser } = require("../controllers/PostNewUser");

router.route("/addUser").post(verifyToken, Post_New_User);
router.route("/getAllUser").get(verifyToken, getAllUser);
module.exports = router;
