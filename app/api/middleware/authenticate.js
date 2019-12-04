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
            res.error({
                code:400,
                status:"token is invalid"
            })
        }  
    } else {
       res.error({
            code:401,
            status:"not authorization"
        });
    }

}