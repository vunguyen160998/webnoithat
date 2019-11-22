let jwt=require("jsonwebtoken")
module.exports = function(req, res, next) {
    if (req.headers['token']) {
        try{
        let authorization=req.headers["token"]
        let secret="furniture"
        req.jwt = jwt.verify(authorization, secret);
        return next();
        }
        catch(err){
            res.error(new Error("token is invalid"))
        }  
    } else {
       res.error(new Error("not authorization"));
    }

}