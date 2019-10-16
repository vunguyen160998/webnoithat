let mongoose=require('mongoose');
let Schema=mongoose.Schema;

var UserSchema=new Schema({
    username:String,
    password:String,
    name:String,
    email:String,
    phone:String,
    timeRegister:Date,
    active:Boolean
})
UserSchema.methods.test=function(name){
    console.log("ok")
    return true;
}
UserSchema.pre('save',(next)=>{
    next();
})

module.exports=mongoose.model("User",UserSchema)