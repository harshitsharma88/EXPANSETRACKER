const PORT=4000;
const express= require('express');
const sequelize=require('./util/database');
const cors=require('cors');
const bodyparser=require('body-parser')
const dotenv=require('dotenv');

const app = express();
app.use(cors());
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(express.text());
dotenv.config();

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


Expanse.belongsTo(User);
User.hasMany(Expanse);

User.hasMany(Order);
Order.belongsTo(User);

Password.belongsTo(User);
User.hasMany(Password);



sequelize.sync()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server Started On PORT - ${PORT}`);
    })
})




