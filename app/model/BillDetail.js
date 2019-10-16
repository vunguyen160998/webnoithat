let mongoose=require('mongoose');
let Schema=mongoose.Schema;

var BillDetailSchema=new Schema({
    bill:{type:Schema.Types.ObjectId,ref:'Bill'},
    product:{type:Schema.Types.ObjectId,ref:'Product'},
    amount:Number,
    price:Number
})
BillDetailSchema.pre('save',(next)=>{
    next();
})
module.exports=mongoose.model("BillDetail",BillDetailSchema)