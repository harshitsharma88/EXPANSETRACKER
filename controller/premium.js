const user=require('../model/usercredentials');

exports.getLeaderBoard=async(req,res,next)=>{
    try {
        const response=await user.findAll({order:[['totalexpanse','desc']]});
        res.status(200).json(response);
        
    } catch (error) {
        console.log(error);
        res.status(500).json("Error Occurred")

    }
}