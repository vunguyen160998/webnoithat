let nodemailer=require("nodemailer")
let Handlebars=require("handlebars");
let transporter=nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
        user:"hoangtunvv@gmail.com",
        pass:"NUTTERTOOLS01644727373"
    }
})

module.exports=async function(to,slug,data,cb){
    logger.debug(`send email to user ${to}`)
    let template=await db.Template.findOne({
        slug:slug
    })
    .lean()
    .exec()
    if(!template)
        cb(new Error("template not found"))
    try{
        let templateHtml = Handlebars.compile(template.html);
        let content = templateHtml(data);
        let result=await transporter.sendMail({
            to:to,
            subject:template.subject,
            html:content
        })
        cb(null,result)
    }
    catch(e){
        cb(new Error(e))
    }
}