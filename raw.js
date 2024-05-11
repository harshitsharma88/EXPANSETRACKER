const user = require('./model/usercredentials');
const expanse=require('./model/expanse');

async function userCreate(){
    try {
        const usr=  await user.findOne({where:{email:'harshit7174@gil.com'}});
        console.log(usr);

        
    } catch (error) {
        console.log(error);
        
    }
}

userCreate()