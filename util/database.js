const Sequelize=require('sequelize');
const sequelize= new Sequelize('expanse','root','Harshit7174@',{
    dialect:'mysql',
    host:'localhost'
})

module.exports=sequelize;