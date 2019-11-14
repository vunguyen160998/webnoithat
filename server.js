let express=require('express');

let app=express();
let PORT=process.env.PORT || 3000 
let mongoose=require("mongoose");
let router=require("./app/api/router")
let init=require("./app/shared/init");
mongoose.connect("mongodb+srv://admin:123qwert@dbnoithat-4t9fp.mongodb.net/test?retryWrites=true&w=majority");
//---------init

init.initGlobal({
    db:require("./app/model"),
    _:require("lodash"),
    async:require("async")
}).then(()=>{
    console.log("set varible global success")
})

//-------------------------



app.use("/api",router)

// db.Product.create({
//     name:"test1",
//     active:true,
//     price:60000,
//     description:"test"
// },(err,data)=>{
//     if(err) console.log(err)
//     else{

//         console.log(data)
//     }
// })


//--------------------------

app.listen(PORT,()=>{
    console.log(`app is running on ${PORT} ...`)
})