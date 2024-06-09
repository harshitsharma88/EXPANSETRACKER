const Orders= require('../model/orders');
const Users= require('../model/usercredentials');
const sequelize=require('../util/database');
const Razorpay= require('razorpay');
const jwt=require('jsonwebtoken')


exports.failedpremium=async(req,res,next)=>{

    try {

        await Orders.updateOne({orderId:req.body.orderId},{status:"FAILED"});

        res.status(202).json({message:"Payment failed"});
        
    } catch (error) {
        res.status(403).json({ error: "Something went wrong" });
    }

}

const generateToken=(id,name,premium)=>{
    return jwt.sign({id:id,name:name,premium:premium},process.env.SECRET_KEY);
}

exports.updatepremium=async(req,res,next)=>{

    try {        

        const updateOrder= Orders.updateOne({orderId:req.body.orderId},
            {
            status:"SUCCESSFULL",
            paymentId:req.body.paymentId},
        );

        const userUpdate= Users.updateOne({_id:req.user._id},{ispremiumuser:true})

        await Promise.all([updateOrder,userUpdate]);

        res.status(202).json({message:"Transaction Successfull",token:generateToken(req.user._id,req.user.name,true)});
     

        
    } catch (error) {
        console.log(error);
        res.status(403).json({error:"Something went Wrong"})
        
    }

}


exports.purchasepremium= async (req,res,next)=>{
    const {user}=req;
    try {
        let rzp = new Razorpay({
            key_id:process.env.RZ_KEY_ID,
            key_secret:process.env.RZ_KEY_SECRET
        });
        const amnt= 3000000

        console.log(rzp);
        
        rzp.orders.create({amount:amnt,currency:"INR"},(err,order)=>{
            if(err){
                throw new Error(JSON.stringify(err));
            }
            Orders.create({userId:user._id,status:'PENDING',orderId:order.id})
            .then(()=>{
                return res.status(201).json({order,key_id:rzp.key_id})
            })
        })
        
    } catch (error) {
        console.log(error);
        
    }
}
