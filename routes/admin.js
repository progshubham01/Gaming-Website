const router = require('express').Router();
const moment = require('moment');
const pool = require('../config/database');
const async = require('async');
const nodemailer = require('nodemailer');

router.get('/', function(req,res){
    console.log("here")
    res.render('admin.ejs');
});

router.get('/user_details',function(req,res){
    var sql="SELECT * FROM login WHERE type="+1+"";
    pool.query(sql,function(err,result){
        if(err)throw err;
        result.forEach(res => {
            res.time = moment(res.time).format("MMMM Do YYYY, h:mm:ss a");
          })
        res.render('admin_user.ejs',{
            user:result
        });
    });
});

router.get('/notification',function(req,res){
    var sql="SELECT * FROM login WHERE type="+1+";SELECT * FROM game";
    pool.query(sql,function(err,results){
        if(err)throw err;
        results[0].forEach(res => {
            res.time = moment(res.time).format("MMMM Do YYYY, h:mm:ss a");
          })
        res.render('admin_notification.ejs',{
            user:results[0],
            game:results[1]
        });
    });
})
router.post('/notification',function(req,res,next){
    console.log(req.body)
          var sql="SELECT * FROM login WHERE id='"+req.body.id+"'";
          pool.query(sql,function(err, user) {
            if (!user.length) {
              req.flash('error', 'No account with that email address exists.');
              return res.redirect('/admin/notification');
            }
            var warning;
            if(!req.body.warning){
              warning=0;
            }
            else{
              warning=1;
            }
            var sql1="INSERT into notification(`game_id`,`notification`,`user_id`,`warning`) VALUES ('"+req.body.game_id+"','"+req.body.notification+"','"+req.body.id+"','"+warning+"')";
            pool.query(sql1,function(err,result){
              if(err)throw err;
            });
          });
        res.redirect('/admin/notification');
    });

router.get('/report_bugs',function(req,res){
    var sql="SELECT a.sr_no,a.uid,a.bug,a.time,b.name FROM report_bugs AS a INNER JOIN login AS b ON a.uid=b.id";
    console.log(sql)
    pool.query(sql,function(err,result){
      if(err)throw err;
      console.log(result)
      result.forEach(res => {
        res.time = moment(res.time).format("MMMM Do YYYY, h:mm:ss a");
      });
    res.render('admin_reported_bugs.ejs',{
        bugs:result
    });
  });
});

router.get('/report_feedback',function(req,res){
  var sql="SELECT a.id,a.uid,a.feedback,a.time,b.name,b.username FROM feedback AS a INNER JOIN login AS b ON a.uid=b.id";
  console.log(sql)
  pool.query(sql,function(err,result){
    if(err)throw err;
    console.log(result)
    result.forEach(res => {
      res.time = moment(res.time).format("MMMM Do YYYY, h:mm:ss a");
    });
  res.render('admin_feedback.ejs',{
      feedback:result
  });
});
});


module.exports = router;
