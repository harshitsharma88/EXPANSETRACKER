const Order= require('../model/orders');
const User= require('../model/usercredentials');
const sequelize=require('../util/database');
const Razorpay= require('razorpay');
const jwt=require('jsonwebtoken')


exports.failedpremium=async(req,res,next)=>{

    try {

        const order=await Order.findOne({where:{orderid:req.body.orderid}});
        console.log(order);

        await order.update({status:"FAILED"});

        res.status(202).json({message:"Payment failed"});
        
    } catch (error) {
        res.status(403).json({ error: "Something went wrong" });
    }

}

const generateToken=(id,name,premium)=>{
    return jwt.sign({id:id,name:name,premium:premium},process.env.SECRET_KEY);
}

exports.updatepremium=async(req,res,next)=>{
    const trn=await sequelize.transaction();
    try {
        const order= await Order.findOne({where:{orderid:req.body.orderid }});
        

        const updateOrder= order.update(
            {
            status:"SUCCESSFULL",
            paymentid:req.body.paymentid},
        {transaction:trn});

        const userupdate= req.user.update({
            ispremiumuser:true
        },{
            transaction:trn
        })

        await Promise.all([updateOrder,userupdate]);

        await trn.commit();
        res.status(202).json({message:"Transaction Successfull",token:generateToken(req.user.id,req.user.name,true)});
     

        
    } catch (error) {
        console.log(error);
        trn.rollback();
        res.status(403).json({error:"Something went Wrong"})
        
    }

}


exports.purchasepremium= async (req,res,next)=>{
    try {

        let rzp = new Razorpay({
            key_id:process.env.RZ_KEY_ID,
            key_secret:process.env.RZ_KEY_SECRET
        });
        const amnt= 3000000
        
        rzp.orders.create({amount:amnt,currency:"INR"},(err,order)=>{
            if(err){
                throw new Error(JSON.stringify(err));
            }
            req.user.createOrder({status:'PENDING',orderid:order.id})
            .then(()=>{
                return res.status(201).json({order,key_id:rzp.key_id})
            })
        })
        
    } catch (error) {
        console.log(error);
        
    }
}
