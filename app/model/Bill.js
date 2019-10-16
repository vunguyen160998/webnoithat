let mongoose=require('mongoose');
let Schema=mongoose.Schema;

var BillSchema=new Schema({
    user:{type:Schema.Types.ObjectId,ref:'User'},
    product:{type:Schema.Types.ObjectId,ref:'Product'},
    total:Number,
    note:String
})
BillSchema.pre('save',(next)=>{
    next();
})
module.exports=mongoose.model("Bill",BillSchema)