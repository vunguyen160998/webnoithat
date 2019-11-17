var express = require('express')
var router = express.Router()
let middleware=require("./middleware")
let morgan=require('morgan')
let bodyParser=require("body-parser")
let controllers=require("./controllers")

// set middleware for all api
router.all("/*",
middleware.corsFilter,
middleware.apiResponse,
bodyParser.urlencoded({extended:true}),
bodyParser.json(),
middleware.processRequest,
morgan("dev")
)
/**
 *  GENERIC API
 **/ 

router.get("/:list/get",(req,res)=>{
    let list=req.params.list;
    db[list].find({},(err,data)=>{
        if(err) res.error("error")
        else
            res.success(data)
    })
})

router.post("/:list/create",(req,res)=>{
    let list=req.params.list;
    let data=req.body
    db[list].create(data,(err,result)=>{
        if(err) res.error(err)
        else
            res.success(result)
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
                res.error(err)
            else{
                res.success(data)
            }
        })
    })
})
/**
 * 
 */
router.get("/product/:id/get",controllers.product.get)
   
router.get("/product/list",controllers.product.getAllProduct)

router.get("/order/list",controllers.order.getAllOrder)

router.get("/order/:id/detail",controllers.order.detail)

router.get("/user/:id/get",controllers.user.getById)
router.get("/user/list",controllers.user.getAllUser)
router.post("/user/create",controllers.user.create)
router.post("/user/:id/update",controllers.user.update)
module.exports =router