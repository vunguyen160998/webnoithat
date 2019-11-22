let mongoose=require('mongoose');
let Schema=mongoose.Schema;

var UserSchema=new Schema({
    name:String,
    password:String,
    email:String,
    phone:String,
    isAdmin:Boolean,
    active:Boolean
})

UserSchema.pre('save',(next)=>{
    next();
})

module.exports=mongoose.model("User",UserSchema)