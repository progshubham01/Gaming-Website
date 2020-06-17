const router = require('express').Router();
const moment = require('moment');
const pool = require('../config/database');


router.get('/', function(req,res){
    res.render('flower.ejs');
});

module.exports = router;
