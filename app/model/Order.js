let mongoose=require('mongoose');
let Schema=mongoose.Schema;

var OrderSchema=new Schema({
    user:{type:Schema.Types.ObjectId,ref:'User'},
    address:String,
    total:Number,
    note:String
})
OrderSchema.pre('save',(next)=>{
    next();
})
module.exports=mongoose.model("Order",OrderSchema)