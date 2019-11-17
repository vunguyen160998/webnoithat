exports.getById=function(req,res){
    let id=req.params.id
    db.User.findOne({
        _id:id
    })
    .lean()
    .exec((err,user)=>{
        if(err || !user) res.error(err || new Error("product not found"))
        else{
            res.success(user)
        }
    })
}

exports.getAllUser=function(req,res){
    db.User.find({})
    .lean()
    .exec((err,users)=>{
        if(err) res.error(err || new Error("product not found"))
        else{
            res.success(users)
        }
    })
}

exports.create=function(req,res){
    let user=req.body;
    db.User.create(user,(err,data)=>{
        if(err) res.error(err)
        else{
            res.success(data)
        }
    })
}
exports.update=function(req,res){
    let update=req.body;
    let id=req.params.id
    db.User.findOne({
        _id:id
    })
    .exec((err,user)=>{
        if(err) res.error(err)
        else{
            user.set(update)
            user.save()
            res.success(true)

        }
    })
}