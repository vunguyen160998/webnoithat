let mongoose=require('mongoose');
let Schema=mongoose.Schema;

var NewsSchema=new Schema({
    title:String,
    content:String,
    avatar:String,
    active:Boolean
})
NewsSchema.pre('save',(next)=>{
    next();
})
module.exports=mongoose.model("News",NewsSchema)