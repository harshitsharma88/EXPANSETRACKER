const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema= new Schema({

    amount:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'user'
    }
})

module.exports= mongoose.model('expense',expenseSchema);



// const sequelize= require('../util/database');
// const {DataTypes}= require('sequelize');

// const Expanse=sequelize.define('expanses',{
//     id:{
//         type:DataTypes.INTEGER,
//         alloowNull:false,
//         autoIncrement:true,
//         primaryKey:true

//     },
//     amount:{
//         type:DataTypes.INTEGER,
//         alloowNull:false,
//     },
//     description: {
//         type: DataTypes.STRING
//     },
//     category: {
//         type: DataTypes.STRING
//     }

// })

// module.exports=Expanse;