const express = require('express')
const app = express()
 
// middleware
app.set('view-engine', 'ejs');
app.use(express.static("./public"));


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

// log in route (brandon)
app.get('/login', function (req,res){
  console.log('we hit student log in')
  res.render('login.ejs');
});

// registration route (brandon)
app.get('/register', function (req,res){
  console.log('we hit student registration')
  res.render('register.ejs');
});

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


 
app.listen(3000, function () {
    console.log("server is live....");
})
