const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Orders = new Schema({
    paymentId:{
        type:String,
    },
    orderId:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        required:true
    }
})


module.exports = mongoose.model('order',Orders);


// const sequelize= require('../util/database');
// const {DataTypes}= require('sequelize');

// const Order= sequelize.define('order',{
//     id:{
//         type:DataTypes.INTEGER,
//         primaryKey:true,
//         allowNull:false,
//         autoIncrement:true

//     },
//     paymentid:DataTypes.STRING,
//     orderid:DataTypes.STRING,
//     status:DataTypes.STRING
// })

// module.exports=Order;