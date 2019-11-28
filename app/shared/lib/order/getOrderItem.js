module.exports=function(order,cb){
    db.OrderItem.find({
        order:order
    })
    .populate({
        path:"product"
    })
    .exec((err,items)=>{
        if(err) cb(err)
        else
            cb(null,items)
    })


}