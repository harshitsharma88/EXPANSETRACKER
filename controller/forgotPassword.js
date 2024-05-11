const users=require('../model/usercredentials');
const sib=require('sib-api-v3-sdk');
const path=require('path');


exports.forgotPassword=async(req,res,next)=>{
    try {

        const {email}= req.body;

        const user = await users.findOne({where:{email:email}});
        
        if(!user){
            return res.status(404).json("User Doesn't Exist");
        }

        const client = sib.ApiClient.instance;
        const apiKey = client.authentications["api-key"];
        apiKey.apiKey = process.env.SIB_API_KEY;
        const tranEmailApi = new sib.TransactionalEmailsApi();

        const sender = {
            email:'harshitsrma88@gmail.com',
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
            <a href="http://localhost:4000/password/setnewpassword/{{params.email}}">Click here</a> to reset your password<br>`,
            params:{
                email:email
            },
        })

        return res.status(200).json('Email Sent')


    } catch (error) {
        console.log(error);

        res.status(500).json("Error Occurred")
        
    }

}


exports.setNewPassword=async (req,res,next)=>{
    
    res.sendFile(path.resolve('public/views/forgotPassword.html'));

}