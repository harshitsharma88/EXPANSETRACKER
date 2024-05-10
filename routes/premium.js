const express= require('express');
const router= express.Router();
const authenticate=require('../middleware/auth');
const premiumController= require('../controller/premium');

router.get('/showleaderboard',premiumController.getLeaderBoard)

module.exports=router;