const express = require("express");
const Product = require("../models/product.model");
const router = express.Router();


router.get("",async(req,res)=>{
    try{
        const products = await Product.find().lean().exec();
        return res.status(200).send(products)
    }catch(err){
        return res.status(500).send({message:err.message})
    }

})
router.post("",async(req,res)=>{
    req.body.user_id = req.user._id;
    try{

        const product = (await Product.create(req.body));
        return res.status(200).send(product)
    }catch(err){
        return res.status(500).send({message:err.message})
    }

})

module.exports = router