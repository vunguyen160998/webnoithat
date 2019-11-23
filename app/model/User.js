let mongoose=require('mongoose');
let Schema=mongoose.Schema;

var UserSchema=new Schema({
    name:String,
    password:String,
    email:String,
    phone:String,
    isAdmin:Boolean,
    avatar:String,
    external:{type:Boolean,default:false},//true: user login by facebook or google
    provider:String,//["facebook","google"]
    externalId:String// id facebook || id google
})

UserSchema.pre('save',(next)=>{
    next();
})

module.exports=mongoose.model("User",UserSchema)