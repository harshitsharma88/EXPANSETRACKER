const {DataTypes}=require('sequelize');
const sequelize= require('../util/database');

const Reports= sequelize.define('reports',{
    url:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

module.exports=Reports;