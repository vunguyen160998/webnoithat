let mongoose=require('mongoose');
let Schema=mongoose.Schema;

var RatingSchema=new Schema({
    user:{type:Schema.Types.ObjectId,ref:'User'},
    product:{type:Schema.Types.ObjectId,ref:'Product'},
    rating:Number
})
RatingSchema.pre('save',(next)=>{
    next();
})
module.exports=mongoose.model("Rating",RatingSchema)