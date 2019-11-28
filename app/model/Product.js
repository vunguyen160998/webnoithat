let mongoose=require('mongoose');
let Schema=mongoose.Schema;

var ProductSchema=new Schema({
    name:String,
    active:Boolean,
    price:Number,
    type:{type:Schema.Types.ObjectId,ref:'ProductType'},
    description:String,
    info:{
        material:String,
        height:Number,
        length:Number,
        width:Number,
        madeIn:String,
        color:String
    },
    warranty:String,
    thumbnail:String,
    images:[String]
})
ProductSchema.pre('save',(next)=>{
    next();
})
module.exports=mongoose.model("Product",ProductSchema)