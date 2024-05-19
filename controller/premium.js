const user=require('../model/usercredentials');
const sequelize=require('../util/database');
const s3AWS=require('../services/awss3');
const { Json } = require('sequelize/lib/utils');
const reports=require('../model/reports');

exports.getLeaderBoard=async(req,res,next)=>{
    try {
        const response=await user.findAll({order:[['totalexpanse','desc']]});
        res.status(200).json(response);
        
    } catch (error) {
        console.log(error);
        res.status(500).json("Error Occurred")

    }
}

exports.downloadReport=async(req,res,next)=>{
    const trn= await sequelize.transaction();
    const {user} = req
    try{
        const entries = await user.getExpanses();
        const date=JSON.stringify(Date())
        const filename= `${user.name}${user.id}-${date}.txt`;

        let data= makeFile(entries);
        
        const {Location}= await s3AWS.uploadtoAWS(filename,data);
        await reports.create({url:Location,userId:user.id},{transaction:trn});
        trn.commit();
        
        return res.status(200).json({url:Location})
        return res.status(200).json({data:data})


    }
    catch(error){
        console.log('/////////////////////////////////////////////////////////////////\ncontroller error',error);
        await trn.rollback();
        res.status(500).json("Error Occurred");
    }
}

function makeFile(entries){
    let data='';
    entries.forEach((element,index)=> {
        const updated= JSON.stringify(element.updatedAt).replace('T','  ')
         data+=`${index+1} ${element.category} ${element.description} ${element.amount} ${updated}\n`;   
        });

    return data;
}