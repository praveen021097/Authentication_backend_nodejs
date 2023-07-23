const User = require("../models/user.model");
const jwt = require('jsonwebtoken');
const generateToken =(user)=>{
    return jwt.sign({user}, 'masaisecret');
}
const register =async(req,res)=>{
        try{
           let user = await User.findOne({email:req.body.email});
//check email
            if(user){
                return res.status(400).send({message:"email already exists"});
            }

            //create user is email not exists

            user = await User.create(req.body);
            const token = generateToken(user);
            return res.status(200).send({user,token})
        }catch(err){
                return res.status(500).send({message:err.message})
        }
}

module.exports ={register}