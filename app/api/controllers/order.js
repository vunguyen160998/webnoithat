

/** get all order
 *  get /order/list
 */
exports.getAllOrder=async function(req,res){
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
    let id= req.params.id
    let order=await db.Order.findOne({
        _id:id
    })
    .populate({
        path:"user",
        select:"name email phone isAdmin avatar"
    })
    .lean()
    .exec()

    try{
        let items=await db.OrderItem.find({
            order:order._id
        })
        .populate("product")
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

exports.getByUser=async function(req,res){
    let id= req.params.user
    let orders=await db.Order.find({
        user:id
    })
    .populate({
        path:"user",
        select:"name email phone isAdmin avatar"
    })
    .lean()
    .exec()
    try{
        let result=[]
        async.forEach(orders,(order,cb)=>{
            let items=db.OrderItem.find({
                order:{
                    $in:order._id
                }
            })
            .populate("product")
            .lean()
            .exec(function(err,data){
                result.push({
                    ...order,
                    items:data
                })
                cb()
            })
           
           
        },(err)=>{
            res.success(result)
        })
      
       
       
    }
    catch(err){
        res.error(err)
    }
}