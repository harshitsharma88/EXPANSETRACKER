const users=require('../model/usercredentials');
const sib=require('sib-api-v3-sdk');
const path=require('path');
const {v4:uuid}=require('uuid');
const passwordTable=require('../model/password');
const userTable=require('../model/usercredentials');
const sequelize= require('../util/database');
const bcrypt= require('bcrypt');


exports.forgotPassword=async(req,res,next)=>{
    try {

        const {email}= req.body;

        const user = await users.findOne({where:{email:email}});
        
        if(!user){
            return res.status(404).json("User Doesn't Exist");
        }

        const id=uuid();
        console.log(id);

        const client = sib.ApiClient.instance;
        const apiKey = client.authentications["api-key"];
        apiKey.apiKey = process.env.SIB_API_KEY;
        const tranEmailApi = new sib.TransactionalEmailsApi();

        const sender = {
            email:'harshit7174@gmail.com',
            name:'Harshit Sharma'
        }
        
        const receivers = [
            {
                email:email
            },
        ]

        await tranEmailApi.sendTransacEmail({
            sender,
            to:receivers,
            subject:'Reset Password Link Expense Tracker Node',
            textContent:' Link Here ',
            htmlContent:`<h4>Dear ${user.name} </h4><br>
            <a href="http://localhost:4000/password/setnewpassword/{{params.rqstid}}">Click here</a> to reset your password for Expanse Tracker App<br>`,
            params:{
                rqstid:id
            },
        })

        await passwordTable.create({
            id:id,
            isactive:true,
            userId:user.id
        })

        console.log("//////////////////////");


        return res.status(200).json('Email Sent')

    } catch (error) {
        console.log(error);

        res.status(500).json("Error Occurred")
        
    }

}


exports.setNewPassword=async (req,res,next)=>{
    try {
         const resetlink= await passwordTable.findOne({
            where:{id:req.params.rqstid}
         })

         if(!resetlink){
            return res.status(404).json({message:"Link Doesn't Exist"})
         }

         if(!resetlink.isactive){
            return res.status(200).json('<h1>Link Expired</h1>')
         }
         await resetlink.update({isactive:false})

        return res.sendFile(path.resolve('public/views/forgotPassword.html'));
        
    } catch (error) {
        
    }

}

exports.updatePassword=async(req,res,next)=>{
    const {rqstid,password} = req.body

    try {

        const resetlink= await passwordTable.findOne({where:{id:rqstid}});

        if(!resetlink){
            return res.status(404).json('Link not found')
        }

        const hashed= await bcrypt.hash(password,10);

        await userTable.update({
            password:hashed
        },
        {where:{id:resetlink.userId}});

        res.data(200).json({message:'Password Set Successfully'})


        
    } catch (error) {

        res.status(500).json({message:'Error Occurred'})
        
    }
}