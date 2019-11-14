

/** get all order
 *  get /order/list
 */
exports.getAllOrder=await function(req,res){
    let skip=req.query.skip
    let limit=req.query.limit
    // count all product
    let count=await db.Order.find({})
    .count()
    let pagination={
        total:count,
        pageSize:req.query.pageSize,
        pageIndex:req.query.pageIndex
    }
    // search all product
    db.Order.find({})
    .skip(skip)
    .limit(limit)
    .lean()
    .exec((err,data)=>{
        if(err) res.error(err)
        else{
        
            res.success(data,pagination)
        }
    })
}

exports.detail=async function(req,res){
    let id= req.params.order
    let order=await db.Order.findOne({
        _id:id
    })
    .lean()
    .exec()
    try{
        let items=await db.OrderItem.find({
            order:order._id
        })
        .lean()
        .exec()
        let result={
            ...order,
            items:items
        }
        res.success(result)
    }
    catch(err){
        res.error(err)
    }
}