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

router.post('/feedback',function(req,res){
    console.log("here")
    var time=moment().format("YYYY-MM-DD HH:mm:ss");
    var sql="INSERT INTO `feedback`(`uid`, `feedback`, `subject`,`time`) VALUES ('"+req.user.id+"','"+req.body.feedback+"','"+req.body.subject+"','"+time+"')";
    pool.query(sql,function(err,result){
        if(err)throw err;
        console.log(result);
    });
});

router.post('/report',function(req,res){
    console.log("here")
    var time=moment().format("YYYY-MM-DD HH:mm:ss");
    var sql="INSERT INTO `report_bugs`(`uid`, `bug`, `time`) VALUES ('"+req.user.id+"','"+req.body.bug+"','"+time+"')";
    pool.query(sql,function(err,result){
        if(err)throw err;
        console.log(result);
    });
});



module.exports = router;
