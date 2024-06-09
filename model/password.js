const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passwordLinks= new Schema({
    id:{
        type:String,
        required:true,
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    isActive:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('passwordLinks',passwordLinks)

// const {DataTypes}=require('sequelize');
// const sequelize= require('../util/database');

// const Password= sequelize.define('passwordlink',{
//     id:{
//         type:DataTypes.STRING,
//         primaryKey:true,
//         allowNull:false
//     },
//     isactive:DataTypes.BOOLEAN
// })

// module.exports=Password