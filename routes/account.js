const { Router } = require('express');
const router = new Router();
const {user, admin} = require('../middelware/auth');



router.get('/get',user, async (req, res) => {
    console.log('----------------------');
    console.log('After middleware');
    
    let resObj = {
        user: req.user.username,
        role: req.user.role,
        success: true
    }

    res.send(JSON.stringify(resObj));
});

router.get('/admin', admin, (req,res) =>{
 res.send(JSON.stringify({success : true , message : 'Is admin'}));
});
router.get('/test', admin, (req, res) => {
    res.send(JSON.stringify({ success: true, message: 'Is admin' }));
});

module.exports = router;