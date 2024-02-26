const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("./models/user.js");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "http://localhost:8080"],
  })
);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
});

//Create New User
app.post("/register", async (req, res) => {
  const { firstName, lastName, email, balance, password } = req.body;
  try {
    const UserDoc = await User.create({
      firstName,
      lastName,
      email,
      balance,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(UserDoc);
  } catch (error) {
    res.status(422).json(error.mongoose);
  }
});

//Login Existing User
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const UserDoc = await User.findOne({ email });

  if (UserDoc) {
    const passOK = bcrypt.compareSync(password, UserDoc.password);
    if (passOK) {
      jwt.sign(
        { email: UserDoc.email, id: UserDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(UserDoc);
        }
      );
    } else {
      res.status(422).json("Password Invalid");
    }
  } else {
    res.json("User Not Found");
  }
});

app.get("/dashboard", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { firstName, lastName, email, balance, _id } = await User.findById(
        userData.id
      );
      res.json({ firstName, lastName, email, balance, _id });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.listen(4000, function () {
  console.log("App is running on Port 4000");
});
