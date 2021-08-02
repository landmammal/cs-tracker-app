const express = require('express')
const db = require("./models");
const passport = require("./config/passport");
const session = require("express-session");
const bodyParser = require("body-parser");





const app = express()


const Port = process.env.PORT || 3000;

app.set('view-engine', 'ejs');
 
// middleware
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({ secret: "keyboard cat", resave: false, saveUninitialized: true })
);

app.use(passport.initialize());
app.use(passport.session());



// app routes

// student profile route
app.get('/profile', function (req, res) {
  console.log("you hit the profile route");
  res.render('profile.ejs');
});

// student log hours route (keshari)
app.get('/log-hours', function (req, res) {
  console.log("you hit the log hours route");
  res.render('log-hours.ejs')
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


