let express=require('express');
let morgan=require('morgan')
let bodyParser=require("body-parser")
let app=express();
let PORT=process.env.PORT || 3000 
let mongoose=require("mongoose");
let router=require("./app/api/index")
let init=require("./app/shared/init");
mongoose.connect("mongodb://localhost:27017/furniture");
//---------init

init.initGlobal({
    db:require("./app/model"),
    _:require("lodash"),
    async:require("async")
}).then(()=>{
    console.log("set varible global success")
})

//-------------------------

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(morgan("dev"))

app.use("/api",router)




//--------------------------

app.listen(PORT,()=>{
    console.log(`app is running on ${PORT} ...`)
})