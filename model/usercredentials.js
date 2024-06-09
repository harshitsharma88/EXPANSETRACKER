const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    ispremiumuser:{
        type:Boolean,
        required:false,
        default:false
    },
    totalexpanse:{
        type:Number,
        default:0,
        required:false
    }
})

module.exports= mongoose.model('user',userSchema);



// const {DataTypes}=require('sequelize');
// const sequelize=require('../util/database');
// const User=sequelize.define('users',{
//     id:{
//         type:DataTypes.INTEGER,
//         autoIncrement:true,
//         primaryKey:true
//     },
//     email:{
//         type:DataTypes.STRING,
//         unique:true,
//         allowNull:false,
//     },
//     name:{
//         type:DataTypes.STRING,
//         allowNull:false

//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     ispremiumuser: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false
//     },
//     totalexpanse:{
//         type:DataTypes.INTEGER,
//         defaultValue:0
//     }
// })

// module.exports=User;