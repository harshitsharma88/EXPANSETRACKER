const sequelize= require('../util/database');
const {DataTypes}= require('sequelize');

const Expanse=sequelize.define('expanses',{
    id:{
        type:DataTypes.INTEGER,
        alloowNull:false,
        autoIncrement:true,
        primaryKey:true

    },
    amount:{
        type:DataTypes.INTEGER,
        alloowNull:false,
    },
    description: {
        type: DataTypes.STRING
    },
    category: {
        type: DataTypes.STRING
    }

})

module.exports=Expanse;