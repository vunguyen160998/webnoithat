let express=require('express');

let app=express();
let PORT=process.env.PORT || 3000 
let path=require("path")
let mongoose=require("mongoose");
let router=require("./app/api/router")
let init=require("./app/shared/init");
mongoose.connect("mongodb+srv://admin:123qwert@dbnoithat-4t9fp.mongodb.net/test?retryWrites=true&w=majority");
//---------init

init.initGlobal({
    db:require("./app/model"),
    _:require("lodash"),
    async:require("async"),
    logger:require("log4js").getLogger(),
    moment:require("moment")
}).then(()=>{
    console.log("set varible global success")
})

//-------------------------
var dir = path.join(__dirname, 'assets/pictures');

app.use(express.static(dir))
app.use("/api",router)

//  db.OrderItem.create({
//     order:"5dd9f7ae652edd4b0088187a",
//     product:"5dd0c0f16a2c6e37d4727507",
//     amount:3,
//     price:1000
// }
// ,(err,data)=>{
//      if(err) console.log(err)
//      else{

//          console.log(data)
//      }
//  })


//--------------------------

app.listen(PORT,()=>{
    console.log(`app is running on ${PORT} ...`)
})