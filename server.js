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
    logger:require("log4js").getLogger()
}).then(()=>{
    console.log("set varible global success")
})

//-------------------------
var dir = path.join(__dirname, 'assets/pictures');

app.use(express.static(dir))
app.use("/api",router)

//  db.User.create({
//     "username":"trongtran",
//     "password":"123456",
//     "name":"Tran Ngoc Trong",
//     "email":"trong.tn178@gmail.com",
//     "phone":"84389814400",
//     "active":true
// },(err,data)=>{
//      if(err) console.log(err)
//      else{

//          console.log(data)
//      }
//  })


//--------------------------

app.listen(PORT,()=>{
    console.log(`app is running on ${PORT} ...`)
})