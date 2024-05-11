const {DataTypes}=require('sequelize');
const sequelize= require('../util/database');

const Password= sequelize.define('passwordlink',{
    id:{
        type:DataTypes.STRING,
        primaryKey:true,
        allowNull:false
    },
    isactive:DataTypes.BOOLEAN
})

module.exports=Password