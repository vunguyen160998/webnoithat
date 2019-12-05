let mongoose=require('mongoose');
let Schema=mongoose.Schema;
const DESCRIPTION={
    "confirmed":"Đã được xác nhận",
    "cancelled":"Đã bị hủy",
    "transport":"Đang vận chuyển",
    "failure":"Thất bại",
    "completed":"Thành công"
}
var OrderSchema=new Schema({
    user:{type:Schema.Types.ObjectId,ref:'User'},
    createdAt:{type:Date},
    total:Number,
    note:String,
    state:{type:String,
        enum:["pending","confirmed","transport","failure","cancelled","completed"],
        default:"pending"
    },
    address:String
})
OrderSchema
.pre('save',function(next){
    let self=this;
    self.createdAt=moment()
    next();
})
//should populate field user
.pre('save',function(next){
    let self=this;
    self.populate({
        path:"user"
    },(err,pop)=>{
        if(err) next(err)
        else{
            self=pop
            next()
        }
    })
})
//should send notif when update order
.pre('save',function(next){
    let self=this
   

    if(self.isModified("state")){
        if(self.state!="pendding"){
            lib.order.getOrderItem(self._id,(err,items)=>{
                if(err) logger.error(err)
                else{
                    let data={
                        ...self.toObject(),
                        items:items,
                        description:DESCRIPTION[self.state]
                    }
                    services.notification.email(self.user.email,"email-customer-update-status-order",data,(err,result)=>{
                        if(err) logger.error(err)
                        else{
                            logger.debug(result)
                        }
                    })
                }
            })
        }
      
    }
    next()
})
module.exports=mongoose.model("Order",OrderSchema)