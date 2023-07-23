const express = require("express");
const userController = require("./controllers/user.controller");
const productController = require("./controllers/product.controller")
const { register, login } = require("./controllers/auth.controller");
const authenticate = require("./middlewares/authenticate");
const app = express();


app.use(express.json());
app.use("/user", userController);
app.post("/register", register);
app.post("/login", login);
app.use("/products",authenticate, productController);
module.exports = app;
