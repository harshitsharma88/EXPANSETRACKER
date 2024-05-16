const express=require('express');
const router= express.Router();
const expanseController=require('../controller/expanseController');
const authenticate=require('../middleware/auth');


router.get('/',expanseController.getHomePage);

router.post('/add-expanse',authenticate,expanseController.addExpanse);

router.delete('/delete-expanse',authenticate,expanseController.deleteExpanse);

router.get('/get-expanse/:itemsperpage/:currentpage',authenticate,expanseController.getExpanse)



module.exports=router;