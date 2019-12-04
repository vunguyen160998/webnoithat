var express = require('express')
var router = express.Router()
let middleware=require("./middleware")
let morgan=require('morgan')
let bodyParser=require("body-parser")
let controllers=require("./controllers")

/**
 *  SET MIDDLEWARE FOR ALL API
 */
router.all("/*",
middleware.corsFilter,
middleware.apiResponse,
bodyParser.urlencoded({extended:true}),
bodyParser.json(),
middleware.processRequest,
morgan("dev")
)

/**
 *  PUBLIC API
 */
router.post("/register",controllers.authen.register)

router.get("/product/list",controllers.product.getAllProduct)
router.get("/product/type/get",controllers.product.getType)
router.get("/product/type/:slug/get",controllers.product.getProductByType)

router.post("/login",controllers.authen.login)
router.post("/login/external",controllers.authen.loginExternal)


/**
 *  PRIVATE API
 **/ 

router.use(middleware.authenticate)

router.get("/order/user/:user/get",controllers.order.getByUser)

router.get("/order/list",controllers.order.getAllOrder)

router.get("/order/:id/detail",controllers.order.detail)

router.all("/:list/*",middleware.checkList)
 
router.get("/:list/get",controllers.generic.get)
router.get("/:list/:id/get",controllers.generic.getById)

router.post("/:list/create",controllers.generic.create)

router.post("/:list/:id/update",controllers.generic.update)

router.get("/:list/:id/delete",controllers.generic.delete)

module.exports =router