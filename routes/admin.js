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
    async.waterfall([
        function(done) {
          var sql="SELECT * FROM login WHERE id='"+req.body.id+"'";
          pool.query(sql,function(err, user) {
            if (!user.length) {
              req.flash('error', 'No account with that email address exists.');
              return res.redirect('/admin/notification');
            }

            var sql1="INSERT into notification(`game_id`,`notification`,`user_id`,`warning`) VALUES ('"+req.body.game_id+"','"+req.body.notification+"','"+req.body.id+"','"+req.body.warning+"')";
            pool.query(sql1,function(err,result){
              if(err)throw err;
              done(err, user);
            });
          });
        },
          function(user, done) {
          console.log(user[0].email)
          var smtpTransport = nodemailer.createTransport({
            service: 'Gmail',
            port: 587,
            secure: false,
            auth: {
              user: '',
              pass: '',
            }
          });
          var mailOptions = {
            from: '"Gaming Website"',
            to: 'shubhamchowdhuri25@gmail.com',
            subject: 'Online Gaming Website',
            text: 'You are receiving this because you (or someone else) has been sent a notification by the admin of the gaming Website +\n\n+'+req.body.notification+'\n\n' +
              'If you did not request this, please ignore this email.\n'
          };
          let info = smtpTransport.sendMail(mailOptions, function(err) {
            console.log('mail sent');
            req.flash('success', 'An e-mail has been sent your mail with further instructions.');
             done(err, 'done');
          });
        }
      ], function(err) {
        if (err) return next(err);
        res.redirect('/admin/notification');
    });
});


module.exports = router;
