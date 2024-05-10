const express=require('express');
const router= express.Router();
const authenticate= require('../middleware/auth');
const purchaseController=require('../controller/purchase');

router.get('/premiummembership',authenticate,purchaseController.purchasepremium);

router.post('/updatepremium',authenticate,purchaseController.updatepremium);

router.post('/failedpremium',purchaseController.failedpremium);



module.exports=router;