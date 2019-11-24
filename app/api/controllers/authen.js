let crypto=require("crypto")
let jwt=require("jsonwebtoken")
let privateKey="furniture"
exports.register=async function(req,res){
    logger.info("[API] - REGISTER")
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512',salt)
    .update(req.body.password)
    .digest("base64");
    req.body.password = salt + "$" + hash;
    let user=await db.User.findOne({
        email:req.body.email
    })
    .lean()
    .exec()
    if(user)
        res.error("this user was existed")
    else{

        db.User.create(req.body,(err,data)=>{
            if(err) res.error(err)
            else{
                res.success({_id:data._id})
            }
        })
    }
}

exports.login=function (req,res){
    logger.info("[API] - LOGIN")
    async.waterfall([
        function getUser(cb){
            logger.debug("[API] - LOGIN - get user")
            db.User.findOne({
                email:req.body.email,
                external:false
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
            logger.debug("[API] - LOGIN - check password")
            let passwordCrypto=user.password.split("$")
            let salt=passwordCrypto[0]
            let hash=crypto.createHmac('sha512',salt).update(req.body.password).digest("base64")
            if(hash===passwordCrypto[1]){    
                cb(null,user)
            }
            else
                cb(new Error("password is invalid"))
        },
        function createToken(user,cb){
            logger.debug("[API] - LOGIN - create token")
            let refreshId = user._id + privateKey;
            let salt = crypto.randomBytes(16).toString('base64');
            let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
            req.body.refreshKey = salt;
            let token = jwt.sign(req.body, privateKey);
            let b = new Buffer(hash);
            let refresh_token = b.toString('base64');
            cb(null,{
                _id:user._id,
                name:user.name,
                email:user.email,
                phone:user.phone,
                avatar:user.avatar,
                isAdmin:user.isAdmin,
                accessToken: token,
                refreshToken: refresh_token
            });
        }
    ],(err,data)=>{
        if(err) res.error(err)
        else{
            res.success(data)
        }
    })
    
    
}
/** /login/external
 *  req.body:{
 *      email name photoUrl provider id
 *  }
 */
exports.loginExternal=function(req,res){
    logger.debug("[API] - LOGIN EXTERNAL")
    let body=req.body;
    async.waterfall([
        function checkUser(cb){
            logger.debug("[API] - LOGIN EXTERNAL - check user")
            db.User.findOne({
                externalId:body.id
            })
            .lean()
            .exec((err,user)=>{
                if(err)
                   cb(err)
                else
                    cb(null,user)
                
            })
        },
        function createUser(user,cb){
 
            if(!user){
                logger.debug("[API] - LOGIN EXTERNAL - create user")
                db.User.create({
                    email:body.email,
                    name:body.name,
                    avatar:body.photoUrl,
                    external:true,
                    externalId:body.id
                },(err,data)=>{
                    if(err) cb(err)
                    else{
                        cb(null,data)
                    }
                })
            }
            else{
                cb(null,user)
            }
        },
        function createToken(user,cb){
            logger.debug("[API] - LOGIN EXTERNAL - create token")
            logger.debug(`[API] - LOGIN EXTERNAL - ${user._id}`)
            let refreshId = user._id + privateKey;
            let salt = crypto.randomBytes(16).toString('base64');
            let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
            let userTemp={
                email:user.email,
                id:user.externalId,
                refreshKey:salt
            }
            let token = jwt.sign(userTemp, privateKey);
            let b = new Buffer(hash);
            let refresh_token = b.toString('base64');
            cb(null,{
                _id:user._id,
                name:user.name,
                email:user.email,
                phone:user.phone,
                avatar:user.avatar,
                isAdmin:user.isAdmin,
                accessToken: token, 
                refreshToken: refresh_token});
        }],(err,data)=>{
            if(err) res.error(err)
            else{
                res.success(data)
            }
        })
}