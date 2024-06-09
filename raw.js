const mongoose= require('mongoose');

async function dbConn(){
    try {
        const conn = await mongoose.connect("mongodb+srv://harshitsrma88:Harshit88@cluster0.ve5mxja.mongodb.net/expensetracker?retryWrites=true&w=majority&appName=Cluster0");
        
        
        
    } catch (error) {
        console.log("DATABASE ERROR ---",error);
        
    }
}

dbConn();