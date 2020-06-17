const router = require('express').Router();
const moment = require('moment');
const pool = require('../config/database');


router.get('/', function(req,res){
    if(req.user.type==0){
        res.redirect('/admin');
    }
    else{
        res.render('index.ejs');
    }
});



module.exports = router;
