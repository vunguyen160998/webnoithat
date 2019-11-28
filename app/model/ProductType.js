let mongoose=require('mongoose');
let Schema=mongoose.Schema;

var ProductTypeSchema=new Schema({
    name:String,
    slug:String
})
ProductTypeSchema.pre('save',(next)=>{
    next();
})
module.exports=mongoose.model("ProductType",ProductTypeSchema)