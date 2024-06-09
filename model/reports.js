const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Reports = new Schema({
    url:{
        type:String,

    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'user'
    }
})

module.exports = mongoose.model('report',Reports);



// const {DataTypes}=require('sequelize');
// const sequelize= require('../util/database');

// const Reports= sequelize.define('reports',{
//     url:{
//         type:DataTypes.STRING,
//         allowNull:false
//     }
// })

// module.exports=Reports;