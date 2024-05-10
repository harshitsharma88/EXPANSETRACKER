const {DataTypes}=require('sequelize');
const sequelize=require('../util/database');
const User=sequelize.define('users',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false

    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ispremiumuser: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    totalexpanse:{
        type:DataTypes.INTEGER,
        defaultValue:0
    }
})

module.exports=User;