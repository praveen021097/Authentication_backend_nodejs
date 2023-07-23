const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) => {
  return jwt.sign({ user }, process.env.token_secret_key);
};

const register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    //check email
    if (user) {
      return res.status(400).send({ message: "email already exists" });
    }

    //create user is email not exists

    user = await User.create(req.body);
    const token = generateToken(user);
    return res.status(200).send({ user, token });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("wrong email or password");
    }
    const match = user.checkPassword(req.body.password);
    //if its does not matched
    if (!match) {
      return res.status(400).send("wrong email or password");
    }
    const token = generateToken(user);
    return res.status(200).send({ user, token });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
module.exports = { register, login };
