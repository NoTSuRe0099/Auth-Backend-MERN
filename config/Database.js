var mongoose = require("mongoose");

const connectDB = () => {
    mongoose
        .connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("🗄️ Connected to mongoDB ✅"))
        .catch((err) => console.log(err));
};

module.exports = connectDB;
