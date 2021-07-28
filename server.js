const express = require('express')
const app = express()
 
// app routes

// student profile route
app.get('/profile', function (req, res) {
  console.log("you hit the profile route");
  res.send('profile page here')
});

// student log hours route (keshari)
app.get('/log-hours', function (req, res) {
  console.log("you hit the log hours route");
  res.send('log hours page here')
});
// student log hours route (keshari)

// log in route (brandon)
app.get('/login', function (req,res){
  console.log('we hit student log in')
  res.send('welcome to log in page');
});

// registration route (brandon)
app.get('/register', function (req,res){
  console.log('we hit student registration')
  res.send('register page here');
});

// admin login route (brandon)

// admin registration route (brandon)

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
