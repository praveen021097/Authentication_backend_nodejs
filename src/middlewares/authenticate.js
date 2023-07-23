const jwt = require("jsonwebtoken");
require("dotenv").config()

const verifyToken = (token)=>{
    return new Promise((resolve,reject)=>{
        var decoded = jwt.verify(token,process.env.token_secret_key,(err,decoded)=>{
            if(err){
                reject(err);
            }
            resolve(decoded)
    })
    })  
}

const authenticate = async(req,res,next)=>{


        if(!req.headers.authorization){
            return res.status(400).send({message:"authentication token not found"})
        }
        if(!req.headers.authorization.startsWith("Bearer ")){
            return res.status(400).send({message:"authentication token not found"})
        }

        const token = req.headers.authorization.trim().split(" ")[1]
        let decoded ;

        try{
                decoded = await verifyToken(token);

        }catch(err){
            return res.status(400).send({message:"authentication token not found"})
        }
        console.log(decoded)

        req.user = decoded.user;
        return next();
}
module.exports = authenticate;