const LocalStrategy = require("passport-local").Strategy;
const pool = require('../config/database');


module.exports = (passport) => {

   passport.use('local', new LocalStrategy({
      usernameField : 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
      function(req, username, password, done)
      {
        console.log("here");

       pool.query("SELECT * FROM login WHERE username = ? ", [username],function(err, rows){
            if(err)
            return done(err);
            console.log(rows[0]);
            if(!rows.length)
            {
               return done(null, false,req.flash('message', 'The Username Not Available In The Database'));
            }
            if (!( rows[0].password == password))
            return done(null, false,req.flash('message', 'Incorrect Password'));

            return done(null, rows[0]);
    });
  })
);

  // Serialize User
  passport.serializeUser(function(user, done) {
    console.log(user);
    done(null, user.id);
  });

  // Deserialise User
  passport.deserializeUser(function(id, done) {
   pool.query("SELECT * FROM login WHERE id = ? ", [id],function(err, rows){
    done(err, rows[0]);
   });
 });

};