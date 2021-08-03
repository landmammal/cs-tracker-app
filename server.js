const express = require('express')
const db = require("./models");
const passport = require("./config/passport");

const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");

// pry = require('pryjs')



const app = express()


const Port = process.env.PORT || 3000;

app.set('view-engine', 'ejs');
 
// middleware
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser()); // required before session.
app.use(
  session({ secret: "keyboard cat", resave: false, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());




// app routes

// student profile route
app.get('/profile', function (req, res) {
  console.log(req.user);
  res.render('profile.ejs');
});

// student log hours route (keshari)
app.get('/log-hours', function (req, res) {
  console.log("you hit the log hours route");
  res.render('log-hours.ejs')
});

// student post loghours
app.post('/log-hours', function (req, res) {
  console.log("you hit the log hours Post route");
  // capture the inputs
  let logInfo = req.body;
  logInfo.UserId = req.user.id

  var today = new Date();
  var dd = String(today.getDate())
  var mm = String(today.getMonth())
  var yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;
  var timeStart = new Date(today +  " " + logInfo.start_time).getHours();
  var timeEnd = new Date(today + " " + logInfo.end_time).getHours();
  
  var total_hours = timeEnd - timeStart;
  logInfo.total_hours = total_hours

  // we need to store the inputs in database log hours
  db.LogHours.create(logInfo)
    .then((log) => {
      // return log created
      res.redirect("/profile");
    })
    .catch((err) => {
      console.log("Error while creating log : ", err);
    });
});

// log in route (anthony)
app.get('/login', function (req,res){
  console.log('we hit student log in')
  res.render('login.ejs');
});

app.post('/login', passport.authenticate("local-signin", {
  successRedirect: "/profile",
  failureRedirect: "/login"
}));

// registration route (anthony)
app.get('/register', function (req,res){
  console.log('we hit student registration')
  res.render('register.ejs');
});

app.post('/register',   passport.authenticate("local-signup", {
    successRedirect: "/profile",
    failureRedirect: "/register"
}));


// admin login route (anthony)
app.get('/admin-login', function (req,res){
  console.log('we hit admin log in')
  res.render('admin-log.ejs');
});

 // admin registration route (anthony)
app.get('/admin-register', function (req,res){
  console.log('we hit admin registration')
  res.render('admin-registration.ejs');
});

// logout route
app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/login");
});

// admin dash route (keshari)
app.get('/admin-dash', function (req, res) {
  console.log("you hit the admin dash route");
  res.render('admin-dash.ejs')
})

// admin single student route (keshari)
app.get('/single-student', function (req, res) {
  console.log("you hit the single-student route");
  res.render('single-student.ejs')
})


 
db.sequelize.sync().then(function() {
  app.listen(Port, function () {
      console.log("server is live....");
  })
});


