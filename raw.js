const user = require('./model/usercredentials');
const expanse=require('./model/expanse');
const {v4:uuid}=require('uuid');
const sequelize= require('./util/database');
const har = JSON.stringify(new getHours())

console.log(har);

// let arr;

// expanse.belongsTo(user);
// user.hasMany(expanse);

// sequelize.sync()
// .then(re=>{
//     db()
// })




// async function db(){
//     const usr = await user.findOne({where:{id:1}});
//     // const expanses = await expanse.findAll({where:{userId:usr.id}});
//     const expanses= await usr.getExpanses();
//    expanses.forEach((element,index)=> {
//    const updated= JSON.stringify(element.updatedAt).replace('T','  ')
//     console.log(`${index+1} ${element.category} ${element.description} ${element.amount} ${updated}`);   
//    });
// }


