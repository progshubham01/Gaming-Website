const router = require('express').Router();
const moment = require('moment');
const pool = require('../config/database');


router.get('/', function(req,res){
    console.log("here")
    res.render('flappy.ejs');
});

router.post('/score',function(req,res){
    console.log(req.body)
    var time=moment().format("HH:mm:ss");
    var sql2="INSERT INTO game_2(`user_id`,`high_score`,`last_vis`) VALUES('"+req.user.id+"','"+req.body.score+"','"+time+"')";
    pool.query(sql2,function(err,result2){
         if(err)throw err;
        console.log(result2);
    });
});
module.exports = router;
