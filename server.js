const express = require('express')
const app = express()
 
// app routes

// student profile route
app.get('/profile', function (req, res) {
  console.log("you hit the profile route");
  res.send('profile page here')
});

// student log hours route (anthony)

// log in route (brandon)
app.get('/login', function (req,res){
  console.log('we hit student log in')
  res.send('welcome to log in page');
});

// registration route (brandon)
app.get('/register', function (req,res){
  console.log('we hit student registration')
  res.send('register');
});

// admin login route (anthony)
app.get('/login', function (req,res){
  console.log('we hit admin log in')
  res.send('welcome to admin log in page');
});

 // admin registration route (antony)
app.get('/register', function (req,res){
  console.log('we hit admin registration')
  res.send('admin-register');
// admin dash route (keshari)
app.get('/admin-dash', function (req, res) {
  console.log("you hit the admin dash route");
  res.send('admin dash page here')
})

// admin single student route (keshari)
app.get('/single-student', function (req, res) {
  console.log("you hit the single-student route");
  res.send('admin student view page here')
})


 
app.listen(3000, function () {
    console.log("server is live....");
})
