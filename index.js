const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/Database");
const auth = require("./routes/auth");
const PostNewUser = require("./routes/PostNewUser");
const cookieParser = require("cookie-parser");

//? server Config
dotenv.config({ path: "./config/config.env" });
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//? Router configuration
app.use("/api/v1/auth", auth);
app.use("/api/v1", PostNewUser);

//* Database Connection
connectDB();

//* Default Path
app.get("/", (req, res) => {
    res.send("Hello there!");
});

//! Listening Config
app.listen(process.env.PORT, () =>
    console.log(`🚀 Listening on  http://localhost:${process.env.PORT}`)
);
