const express=require('express');
const router = express.Router();
const passwordController=require('../controller/forgotPassword');

router.post('/forgotpassword',passwordController.forgotPassword);

router.get('/setnewpassword/:mail',passwordController.setNewPassword)

module.exports=router;