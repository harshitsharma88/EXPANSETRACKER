const sequelize= require('../util/database');
const {DataTypes}= require('sequelize');

const Order= sequelize.define('order',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true

    },
    paymentid:DataTypes.STRING,
    orderid:DataTypes.STRING,
    status:DataTypes.STRING
})

module.exports=Order;