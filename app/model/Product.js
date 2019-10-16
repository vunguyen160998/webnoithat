let mongoose=require('mongoose');
let Schema=mongoose.Schema;

var ProductSchema=new Schema({
    name:String,
    active:Boolean,
    price:Number,
    type:String,
    description:String,
    info:{
        height:Number,
        length:Number,
        width:Number,
        madeIn:String,
        color:String
    },
    picture:[String]
})
ProductSchema.pre('save',(next)=>{
    next();
})
module.exports=mongoose.model("Product",ProductSchema)