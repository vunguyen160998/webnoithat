let mongoose=require('mongoose');
let Schema=mongoose.Schema;

var OrderItemSchema=new Schema({
    order:{type:Schema.Types.ObjectId,ref:'Order'},
    product:{type:Schema.Types.ObjectId,ref:'Product'},
    amount:Number,
    price:Number
})
OrderItemSchema.pre('save',(next)=>{
    next();
})
module.exports=mongoose.model("OrderItem",OrderItemSchema)