const mongoose = require("mongoose");

const producSchema = new mongoose.Schema({
    title:{type:String,required:true},
    price:{type:Number,required:true},
    user_id :{type:mongoose.Schema.ObjectId,ref:"user",required:true}
},{
    versionKey:false,
    timestamps:true,
})

module.exports = mongoose.model("product",producSchema);
