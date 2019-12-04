/** get detail product
 *  get: /product/:id/get
 */
exports.get=function(req,res){
    let id=req.params.id
    db.Product.findOne({
        _id:id
    })
    .lean()
    .exec((err,product)=>{
        if(err || !product) res.error(err || new Error("product not found"))
        else{
            res.success(product)
        }
    })
}

/** get all product
 *  get: /product/list
 */
exports.getAllProduct=async function(req,res){
    let skip=req.query.skip
    let limit=req.query.limit
    // count all product
    let count=await db.Product.find({})
    .count()
    let pagination={
        total:count,
        pageSize:req.query.pageSize,
        pageIndex:req.query.pageIndex
    }
    // search all product
    db.Product.find({})
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
/**
 *  api: /product/type/:slug/get
 *      
 *  */
exports.getProductByType=function(req,res){
    let slug=req.params.slug
    db.ProductType
    .findOne({
        slug:slug
    })
    .lean()
    .exec((err,type)=>{
        if(err || !type) res.error(err || new Error("404 productType not found"))
        else{
            db.Product
            .find({
                type:type._id
            })
            .lean()
            .exec((err,data)=>{
                if(err ) res.error(err)
                else{
                    res.success(data)
                }
            })
        }
    })
}
/**
 *  GET: /api/product/type/get
 *  
 */
exports.getType=function(req,res){
    db.ProductType
    .find()
    .lean() 
    .exec((err,data)=>{
        if(err) res.error(err)
        else{
            res.success(data)
        }
    })
}