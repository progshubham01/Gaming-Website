const router = require('express').Router();
const moment = require('moment');
const pool = require('../config/database');


router.get('/', function(req,res){
    console.log("here")
    res.render('flappy.ejs');
});

module.exports = router;
