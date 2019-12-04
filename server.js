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
    moment:require("moment"),
    services:require("./app/shared/services"),
    lib:require("./app/shared/lib")
}).then(()=>{
    console.log("set varible global success")
})

//-------------------------
var dir = path.join(__dirname, 'assets/pictures');
logger.level = 'debug';
console.log(dir)
app.use(express.static(dir))
app.use("/api",router)

//  db.Product.findOne({
//     type:"5ddf7bed88746e09cc548ae9"
//  })
//  .populate({
//      path:"type"
//  })
//  .exec((err,newData)=>{
//      if(err) console.log(err)
//      else{
      
//          console.log(newData)
//      }
//  })

//--------------------------

app.listen(PORT,()=>{
    console.log(`app is running on ${PORT} ...`)
})

