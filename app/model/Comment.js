let mongoose=require('mongoose');
let Schema=mongoose.Schema;

var CommentSchema=new Schema({
    product:{type:Schema.Types.ObjectId,ref:'Product'},
    email:String,
    content:String,
    time:Date
})
CommentSchema.pre('save',(next)=>{
    next();
})
module.exports=mongoose.model("Comment",CommentSchema)