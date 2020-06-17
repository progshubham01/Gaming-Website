const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
var flash = require('connect-flash');


// Routes Being Set Here
const login = require('./routes/login');
const index = require('./routes/index');
const pool =  require('./routes/pool');
const flower = require('./routes/flower');
const flappy = require('./routes/flappy');
const admin = require('./routes/admin');
const space = require('./routes/space');

var app = express();
const port = process.env.PORT;

var genLog = (request, response, next) => {
  console.log(`${request.method} ${request.originalUrl}`);
  next();
}

app.set('view engine', 'ejs');
app.use('/index',express.static(__dirname + '/public'));
app.use('/pool',express.static(__dirname + '/pool_game'));
app.use('/flappy',express.static(__dirname + '/flappy'));
app.use('/flower',express.static(__dirname + '/flower'));
app.use('/space_invader',express.static(__dirname + '/space_invader'));
app.use('/admin',express.static(__dirname + '/admin'))

app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: 'ilovecarsandbikes',
  resave: false,
  saveUninitialized: true,
}));

//Flash message//
app.use(flash());

// Middleware to create log for the user
app.use(genLog);

app.use(passport.initialize());
app.use(passport.session());

// Middleware to check if the user is logged in
function ensureAuthenticated(request, response, next) {
  if(request.isAuthenticated()) {
    return next();
  }

  else{
    request.logout();
    response.redirect('/');
  }
}


app.use('/', login);
app.use('/index',ensureAuthenticated,index);
app.use('/pool',ensureAuthenticated,pool)
app.use('/flappy',ensureAuthenticated, flappy);
app.use('/space_invader',ensureAuthenticated,space);
app.use('/admin',ensureAuthenticated,admin);
app.use('/flower',ensureAuthenticated,flower);

app.get('/logout', (request, response) => {
  request.logout();
  request.session.destroy();
  response.redirect('/');
});


app.listen(port, () => {
  console.log(`Port: ${port}`);
  console.log(`Env: ${process.env.NODE_ENV}`);
});
