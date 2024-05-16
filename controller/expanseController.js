const path=require('path');
const expanse=require('../model/expanse');
const user=require('../model/usercredentials');
const sequelize= require('../util/database');
const { transcode } = require('buffer');

exports.getHomePage=(req,res,next)=>{
    res.sendFile(path.resolve('public/views/expanse.html'))
}

exports.getExpanse=async (req,res,next)=>{
    const {user}=req;
    let{itemsperpage,currentpage}=req.params;
    console.log(req.params);
    
    try {
        let response = await expanse.findAll({where:{userId:user.id}});

            itemsperpage= parseInt(itemsperpage);
            currentpage=parseInt(currentpage)
            
            const totalpages= Math.ceil(response.length/itemsperpage);
    
            const from = itemsperpage*(currentpage-1);
    
            const to = currentpage*itemsperpage-1;
    
            response=response.slice(from,to+1);
            
        
        res.status(200).json({response,premium:user.ispremiumuser,totalpages})
    } 
    catch (error) {
        res.status(500).json("Server Error")
    }
}

exports.addExpanse=async (req,res,next)=>{
    const trn= await sequelize.transaction();
    
    try {
        
        const updateuser= req.user.update({totalexpanse:req.user.totalexpanse+Number(req.body.amount)}
        ,{transaction:trn});

        const addexpanse= expanse.create({
            amount:req.body.amount,
            category:req.body.category,
            description:req.body.description,
            userId:req.user.id
        }
        ,{transaction:trn});

        const all=await Promise.all([updateuser,addexpanse]);

        
        await trn.commit();

        res.status(201).json(all[1].dataValues);


        
        
    } 
    catch (error) {
        trn.rollback();
        console.log(error);

        res.status(500).json("Error Occurred")
        
    }
    
}

exports.deleteExpanse=async (req,res,next)=>{
    console.log("/////////////////////////////////////");
    const trn= await sequelize.transaction();
    try{
        const deleteExpanse= expanse.destroy({where:{id:req.body.id}},{transaction:trn});

        const userAmount= req.user.update({totalexpanse:req.user.totalexpanse-Number(req.body.amount)}
        ,{transaction:trn});

        await Promise.all([deleteExpanse,userAmount]);
        await trn.commit();

        res.status(200).json("Deleted");
        

    }
    catch(err){

        trn.rollback();
        console.log(err);
        res.status(500).json('Something Went Wrong')

    }
}
