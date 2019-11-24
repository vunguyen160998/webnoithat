let mongoose=require('mongoose');
let Schema=mongoose.Schema;

var OrderSchema=new Schema({
    user:{type:Schema.Types.ObjectId,ref:'User'},
    createdAt:{type:Date},
    total:Number,
    note:String,
    state:String//["pending","confirmed","transport","failure","cancelled","completed"]
})
OrderSchema.pre('save',function(next){
    let self=this;
    self.createdAt=moment()
    next();
})
module.exports=mongoose.model("Order",OrderSchema)