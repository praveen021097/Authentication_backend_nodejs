const express = require("express");
const userController = require("./controllers/user.controller");
const {register} =  require('./controllers/auth.controller')
const app = express();
app.use(express.json())
app.use("/user",userController);
app.post("/register",register)
module.exports =app;
