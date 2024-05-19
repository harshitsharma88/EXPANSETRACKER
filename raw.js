const express =require('express');
const app = express();

app.use('/',(req,res,next)=>{
    console.log(req)
res.json({msg:"HUE HUE HUE"})
})

app.listen(3000,()=>{
console.log('started')
})