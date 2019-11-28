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
app.use(express.static(dir))
app.use("/api",router)

 db.Order.findOne({
    _id:"5de01c2ba1b37d00173a7ec2"
 },(err,data)=>{
     if(err) console.log(err)
     else{
            data.set({state:"cancelled"})
            data.save()
         console.log(data)
     }
 })

//--------------------------

app.listen(PORT,()=>{
    console.log(`app is running on ${PORT} ...`)
})

