let mongoose=require('mongoose');
let Schema=mongoose.Schema;

var TemplateSchema=new Schema({
    name:String,
    slug:String,
    type:{type:String,enum:["email","sms"],default:"email"},
    subject:String,
    html:String,
    text:String
})
TemplateSchema.pre('save',(next)=>{
    next();
})
module.exports=mongoose.model("Template",TemplateSchema)