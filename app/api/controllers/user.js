let crypto=require("crypto")
let jwt=require("jsonwebtoken")

exports.register=function(req,res){
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512',salt)
    .update(req.body.password)
    .digest("base64");
    req.body.password = salt + "$" + hash;
    db.User.create(req.body,(err,data)=>{
        if(err) res.error(err)
        else{
            res.success({_id:data._id})
        }
    })
}

exports.login=function (req,res){
    async.waterfall([
        function getUser(cb){
            db.User.findOne({
                email:req.body.email
            })
            .lean()
            .exec((err,user)=>{
                if(err || !user)
                   cb(err || new Error("email is invalid"))
                else
                    cb(null,user)
                
            })
        },
        function checkPassword(user,cb){
            let passwordCrypto=user.password.split("$")
            let salt=passwordCrypto[0]
            let hash=crypto.createHmac('sha512',salt).update(req.body.password).digest("base64")
            console.log(user.password)
            console.log(hash)
            if(hash===passwordCrypto[1]){    
                cb(null,user)
            }
            else
                cb(new Error("password is invalid"))
        },
        function createToken(user,cb){
            let privateKey="furniture"
            let refreshId = user._id + privateKey;
            let salt = crypto.randomBytes(16).toString('base64');
            let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
            req.body.refreshKey = salt;
            let token = jwt.sign(req.body, privateKey);
            let b = new Buffer(hash);
            let refresh_token = b.toString('base64');
            cb(null,{accessToken: token, refreshToken: refresh_token});
        }
    ],(err,data)=>{
        if(err) res.error(err)
        else{
            res.success(data)
        }
    })
    
    
}