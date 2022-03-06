const mongoose = require("mongoose");

const New_User_Schema = new mongoose.Schema({
    username: { type: String, required: true },
    mobileNumber: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("New_User", New_User_Schema);
