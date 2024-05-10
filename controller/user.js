const usercredentials=require('../model/usercredentials')
const expanse=require('../model/expanse')
const jwt =require('jsonwebtoken');

const path=require('path')
const bcrypt=require('bcrypt');

exports.home=(req,res,next)=>{
    res.sendFile(path.resolve('public','views','login.html'));
    
}

exports.signUp=async (req,res,next)=>{
    try{
        const hashed=await bcrypt.hash(req.body.password,10);
        await usercredentials.create({
            name:req.body.name,
            email:req.body.email,
            password:hashed
        })
        res.status(201).json('user created')

    }
    catch(err){
        res.status(500).json("Not Created")
    }

}

const generateToken=(id,name,premium)=>{
    return jwt.sign({id:id,name:name,premium:premium},process.env.SECRET_KEY);
}

exports.logIn=async function(req,res,next){

    try{
       await usercredentials.findOne({where:{
            email:req.body.email
        }})
        .then(user=>{
            if(user){
                bcrypt.compare(req.body.password,user.password,(err,result)=>{
                    if(err){
                        res.status(500).json('Something Wrong')
                    }
                    if(result){
                        
                    res.status(200).json({message:"Logged In",token:generateToken(user.id,user.name,user.ispremiumuser)});
                    
                    }
                    else{
                        res.status(400).json("incorrect password")
                    }
                })
                
                
            }
            else{
                res.status(404).json("User Not Found");
            }

        })
    }
    catch(err){
        res.status(500).json("Something Went Wrong")
    }

}