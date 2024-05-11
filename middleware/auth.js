const jwt=require('jsonwebtoken');
const User=require('../model/usercredentials');

async function authenticate(req,res,next){
    
    try{
    const token=req.header("Authorazation");
   
    if(!token){
        return res.status(401).json("Authorization token missing");
    }
    
    const decoded= jwt.verify(token,process.env.SECRET_KEY);
   
    const user= await User.findByPk(decoded.id);
   
    if(!user){
        return res.status(404).json('User Not Exists')
    }
    req.user=user;
    next();
   

}catch(err){
    return res.status(404).json({error:err.message})
}
}



module.exports=authenticate;