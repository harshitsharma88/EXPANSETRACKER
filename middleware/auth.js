const jwt=require('jsonwebtoken');
const User=require('../model/usercredentials');

async function authenticate(req,res,next){
    console.log('////////////////////////////////////////');
    console.log('in auth');
    console.log("HEADERS----------",req.headers);
    console.log("BODY--------------",req.body);
    try{
    const token=req.header("Authorazation");
    console.log("REQUEST--------",req);
    console.log("TOKEN----",token);
    if(!token){
        return res.status(401).json("Authorization token missing");
    }
    
    const decoded= jwt.verify(token,process.env.SECRET_KEY);
    console.log("DECODED----",decoded);
    const user= await User.findByPk(decoded.id);
    console.log("USER----",user);
    if(!user){
        return res.status(404).json('User Not Exists')
    }
    req.user=user;
    next();
    console.log('out auth');
    console.log('/////////////////////////////////');

}catch(err){
    return res.status(404).json({error:err.message})
}
}



module.exports=authenticate;