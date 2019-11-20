function standardList(list){
    let temp=list.replace(" ","").toLowerCase()
    result=temp[0].toUpperCase() + temp.slice(1);
    return result
}

module.exports=function(req,res,next){
    let list=standardList(req.params.list);
    if(!db[list]){
        res.error(`model ${list} not exist`)
    }
    else{
        req.list=list;
        next()
    }
}