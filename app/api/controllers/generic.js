
/**
 *  GET: /:list/get
 */
exports.get=function(req,res,next){
    let list=req.list
    db[list].find({},(err,data)=>{
        if(err) res.error("error")
        else
            res.success(data)
    })
}
/**
 *  GET: /:list/:id/get
 */
exports.getById=function(req,res){
    let list=req.list;
    let id=req.params.id
    db[list].findOne({
        _id:id
    },(err,data)=>{
        if(err || !data) res.error(err || `${list} not found`)
        else
            res.success(data)
    })
}
/**
 *  POST: /:list/:id/update
 *  data:input.body
 */

exports.update=function (req,res){
    let list=req.list;
    let update=req.body;
    let id=req.params.id
    db[list].findOne({
        _id:id
    })
    .exec((err,data)=>{
        if(err || !data) res.error(err || `${list} not found`)
        else{
            data.set(update)
            data.save((err,newData)=>{
                if(err) res.error(err)
                else
                   res.success(newData)
            })
           

        }
    })
}
/**
 *  POST: /:list/create
 *  data:input.body
 */
exports.create=function(req,res){
    let list=req.list
    let data=req.body;
    db[list].create(data,(err,newData)=>{
        if(err) res.error(err)
        else{
            res.success(newData)
        }
    })
}
/**
 *  GET: /:list/:id/delete
 */
exports.delete=function(req,res){
    let list=req.list;
    let id=req.params.id
    db[list].remove({
        _id:id
    },(err,result)=>{
        if(err) res.error(err)
        else
            res.success(result)
    })
}