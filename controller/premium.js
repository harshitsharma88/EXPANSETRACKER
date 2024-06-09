const Users=require('../model/usercredentials');
const Expenses = require('../model/expanse');
const s3AWS=require('../services/awss3');
const Reports=require('../model/reports');

exports.getLeaderBoard=async(req,res,next)=>{
    try {
        const response = await Users.find().sort({totalexpanse:-1});
        res.status(200).json(response);
        
    } catch (error) {
        console.log(error);
        res.status(500).json("Error Occurred")

    }
}

exports.downloadReport=async(req,res,next)=>{

    const {user} = req
    try{
        const entries = await Expenses.find({userId:user._id});
        const date=JSON.stringify(Date())
        const filename= `${user.name}${user.id}-${date}.txt`;

        let data= makeFile(entries);
        
        const {Location}= await s3AWS.uploadtoAWS(filename,data);
        await Reports.create({url:Location,userId:user._id});
     
        
        return res.status(200).json({url:Location})
        // return res.status(200).json({data:data})


    }
    catch(error){
        console.log('/////////////////////////////////////////////////////////////////\ncontroller error',error);
        res.status(500).json("Error Occurred");
    }
}

function makeFile(entries){
    let data='';
    entries.forEach((element,index)=> {
         data+=`${index+1} ${element.category} ${element.description} ${element.amount} \n`;   
        });

    return data;
}