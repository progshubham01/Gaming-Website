const router = require('express').Router();
const passport = require('passport');

const pool = require('../config/database');

// Passport functionalities is included
require('../config/passport')(passport);

router.get('/', function(req, res) {
  res.render('login.ejs',{
    success:req.flash('success'),
    error:req.flash('error')
  });
});


router.post('/', passport.authenticate('local', {
    successRedirect: '/index',
    failureRedirect: '/'
  })
);


module.exports = router;