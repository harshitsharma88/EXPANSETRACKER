const path=require('path');
const Expenses=require('../model/expanse');
const User=require('../model/usercredentials');
const mongoose = require('mongoose');

exports.getHomePage=(req,res,next)=>{
    res.sendFile(path.resolve('public/views/expanse.html'))
}

exports.getExpanse=async (req,res,next)=>{
    const {user}=req;
    let{itemsperpage,currentpage}=req.params;
    
    try {

        itemsperpage= parseInt(itemsperpage);
        currentpage=parseInt(currentpage)

        let totalItems = await Expenses.countDocuments({userId:user._id});
        const totalpages= Math.ceil(totalItems/itemsperpage);

        const toSkip = itemsperpage*(currentpage-1);
        let response = await Expenses.find({userId:user._id}).skip(toSkip).limit(itemsperpage);
        
        res.status(200).json({response,premium:user.ispremiumuser,totalpages})
    } 
    catch (error) {
        res.status(500).json("Server Error")
    }
}

exports.addExpanse=async (req,res,next)=>{
    const {user} = req;
    
    try {

        console.log(user.totalexpanse,"----",req.body.amount);
        
        const updateuser= User.updateOne({_id:user._id},{totalexpanse:user.totalexpanse+Number(req.body.amount)});

        const addexpanse= Expenses.create({
            amount:req.body.amount,
            category:req.body.category,
            description:req.body.description,
            userId:user._id
        });

        const all = await Promise.all([updateuser,addexpanse]);

        res.status(201).json(all[1].dataValues);  
        
    } 
    catch (error) {
        console.log(error);
        res.status(500).json("Error Occurred")
        
    }
    
}

exports.deleteExpanse=async (req,res,next)=>{
    console.log("/////////////////////////////////////");
    console.log(req.body);
    const {user}=req;
    try{
        const deleteExpanse= Expenses.findByIdAndDelete({_id:req.body._id});

        const userAmount= User.updateOne({_id:user._id},{totalexpanse:user.totalexpanse-Number(req.body.amount)}
       );

        await Promise.all([deleteExpanse,userAmount]);

        res.status(200).json("Deleted"); 

    }
    catch(err){
        console.log(err);
        res.status(500).json('Something Went Wrong')

    }
}
