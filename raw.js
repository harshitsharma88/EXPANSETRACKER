const user = require('./model/usercredentials');
const expanse=require('./model/expanse');

async function userCreate(){
    try {
        const usr=  user.create({
            email:"udit@gmail.com",
            name:"UDIT",
            password:"UDITSHARMA"
        })

        const exp =expanse.create({
            amount :111
        })

        const pr= await Promise.all([usr,exp]);
        console.log(pr);
        
    } catch (error) {
        console.log(error);
        
    }
}

userCreate()