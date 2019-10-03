var express = require('express')
var router = express.Router()


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
module.exports =router