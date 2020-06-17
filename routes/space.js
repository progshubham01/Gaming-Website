const router = require('express').Router();
const moment = require('moment');
const pool = require('../config/database');


router.get('/', function(req,res){
    res.render('space.ejs');
});

router.post('/score',function(req,res){
    console.log(req.body)
    var time=moment().format("HH:mm:ss");
    var sql="SELECT * FROM game_3 WHERE user_id='"+req.user.id+"'";
    var sql2;
    pool.query(sql,function(err,result){
        if(err)throw err;
        console.log(result)
        if(result.length){
            if(result[0].high_score < req.body.score){
                 sql2="UPDATE `game_3` SET `high_score`='"+req.body.score+"' WHERE id='"+req.user.id+"'"; 
                 pool.query(sql2,function(err,result2){
                    if(err)throw err;
                    console.log(result2);
                });
            }
        }
        else{
            sql2="INSERT INTO game_3(`user_id`,`high_score`,`last_vis`) VALUES('"+req.user.id+"','"+req.body.score+"','"+time+"')";
            pool.query(sql2,function(err,result2){
                if(err)throw err;
                console.log(result2);
            });
        }
    });
});

module.exports = router;
