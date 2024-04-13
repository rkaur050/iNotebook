const jwt = require("jsonwebtoken");

JWT_SECRET = "firstfullstack-app";

const fetchUser= (req,res,next)=>{

    //Get user  from jwt toekn and add id to req object
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authenticate using a valid token"});
    }try{
    const data=jwt.verify(token,JWT_SECRET);
    req.user=data.user;
    next();
    }catch(err){
        res.status(401).send({error:"Please authenticate using a valid token"})
    }
}

module.exports=fetchUser;