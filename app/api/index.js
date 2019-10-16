var express = require('express')
var router = express.Router()

/**
 *  GENERIC API
 **/ 

router.get("/:list/get",(req,res)=>{
    let list=req.params.list;
    db[list].find({},(err,data)=>{
        if(err) res.send("error")
        else
            res.send(data)
    })
})

router.post("/:list/create",(req,res)=>{
    let list=req.params.list;
    let data=req.body
    db[list].create(data,(err,result)=>{
        if(err) res.send("err")
        else
            res.send(result)
    })
})

router.post("/:list/update",(req,res)=>{
    let list=req.params.list;
    let filter=req.body.filter
    let update=req.body.update
    db[list].findOne(filter,(err,data)=>{
        data.set(update)
        data.save((err,data)=>{
            if(err)
                res.send("err")
            else{
                res.send(data)
            }
        })
    })
})

   

module.exports =router