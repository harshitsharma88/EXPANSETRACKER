require('dotenv').config();
PORT=process.env.PORT;
const express= require('express');
const cors=require('cors');
const bodyparser=require('body-parser');
const dbConn= require('./util/database');


const app = express();
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

dbConn()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Started on ${PORT}`);
    })
})
.catch((error)=>{
    console.log(error);
})





