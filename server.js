let express=require('express');
let morgan=require('morgan')
let bodyParser=require("body-parser")
let app=express();
let PORT=process.env.PORT || 3000 
let db=require("./app/model");
let mongoose=require("mongoose");
let router=require("./app/api/index")
mongoose.connect("mongodb://localhost:27017/furniture");
global.db=db;

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(morgan("dev"))

app.get("/",(req,res)=>{
    res.send('wellcome to the homepage')
})
app.use("/api",router)
app.listen(PORT,()=>{
    console.log(`app is running on ${PORT} ...`)
})