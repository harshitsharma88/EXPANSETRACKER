const PORT=80;
const express= require('express');
const cors=require('cors');
const bodyparser=require('body-parser')
const dotenv=require('dotenv').config();
const sequelize=require('./util/database');
const helmet=require('helmet');
const path= require('path');


const app = express();


// app.use(helmet());
app.use(cors());
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(express.text());


app.use(express.static('public'));


// Routes
const userRoute=require('./routes/userRoutes')
const expanseRoute=require('./routes/expanseRoutes');
const purchaseRoute=require('./routes/purchaseRoutes');
const premiumRoute=require('./routes/premium');
const passwordRoute=require('./routes/forgotPassword')


app.use('/',userRoute);
app.use('/user',userRoute);
app.use('/expanse',expanseRoute);
app.use('/purchase',purchaseRoute);
app.use('/premium',premiumRoute);
app.use('/password',passwordRoute);


/////Models
const Expanse=require('./model/expanse');
const User=require('./model/usercredentials');
const Order=require('./model/orders');
const Password=require('./model/password');
const Reports=require('./model/reports');


Expanse.belongsTo(User);
User.hasMany(Expanse);

User.hasMany(Order);
Order.belongsTo(User);

Password.belongsTo(User);
User.hasMany(Password);

User.hasMany(Reports);
Reports.belongsTo(User);



sequelize.sync()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server Started On PORT - ${PORT}`);
    })
})




