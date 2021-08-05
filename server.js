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

// root route
app.get('/', function (req, res) {
  res.redirect('/profile');
});


// student profile route
app.get('/profile', function (req, res) {
  // console.log(req.user);
  db.LogHours.findAll({
  where:{
    UserId: req.user.id
  }
  }).then(function (all_hours) {
  
    // find unconfirmed hours and send them to profile
    let unconfirmed_hours = 0
    let confirmed_hours = []
    let total_hours_done = 0
  
  for (let index = 0; index < all_hours.length; index++) {
    if (all_hours[index].approved === false) {
      unconfirmed_hours = unconfirmed_hours + all_hours[index].total_hours;
      
    } else {
      confirmed_hours.push(all_hours[index])
      total_hours_done = total_hours_done + all_hours[index].total_hours
    }  
  }
  
  db.User.update({
       done_hours: total_hours_done,
   },
     {
      where: {
        id: req.user.id
      }
    }).then(function (updatedUser) {
      console.log(updatedUser);
      console.log(unconfirmed_hours, confirmed_hours);
      req.user.done_hours = total_hours_done
      res.render('profile.ejs', {user: req.user, unconfirmed_hours, confirmed_hours});
    })
    
    

  }).catch(function(err){
    console.log('something went wrong looking at loghours for this user : ', err);
  });

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
  logInfo.approved = false
  logInfo.school = req.user.school

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
  res.render('admin-log.ejs');
});

app.post('/admin-login', passport.authenticate("local-signin", {
    successRedirect: "/admin-dash",
    failureRedirect: "/login"
}));

 // admin registration route (anthony)
app.get('/admin-register', function (req,res){
  res.render('admin-registration.ejs');
});

app.post('/admin-register', passport.authenticate("local-signup", {
    successRedirect: "/admin-dash",
    failureRedirect: "/register"
}));

// logout route
app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/login");
});

// admin dash route (keshari)
app.get('/admin-dash', function (req, res) {
  
  if (req.user.admin === false) {
    res.render('admin-dash-denied.ejs')     
  } else {
    db.LogHours.findAll({
      where: {
        school: req.user.school,
        approved: false
      }
    }).then(function (unconfirmed_hours) {      
      // find unconfirmed hours and send them to admin dash
      res.render('admin-dash.ejs', {unconfirmed_hours})     
    }).catch(function(err){
      console.log('something went wrong looking at log hours for this all users : ', err);
    });
  }
  

});

// admin single student route (keshari)
app.get('/single-student/:id', function (req, res) {
  db.User.findOne({
    where: {
      id: req.params.id
    }
  }).then(function (student) {
     db.LogHours.findAll({
        where:{
          UserId: student.id,
          approved: false
        }
      }).then(function (all_hours) {
      
        // find unconfirmed hours and send them to profile
      let unconfirmed_hours = 0
      let unconfirmed_records = []
      
      for (let index = 0; index < all_hours.length; index++) {        
          unconfirmed_hours = unconfirmed_hours + all_hours[index].total_hours;          
          unconfirmed_records.push(all_hours[index])        
      }
      
      res.render('single-student.ejs', { student, unconfirmed_hours, unconfirmed_records })      

  }).catch(function(err){
    console.log('something went wrong looking at loghours for this user : ', err);
  });


  })
  
})

app.post("/approved-hours", function (req, res) {
  console.log('hit approved hours post');
  console.log(Object.keys(req.body));
  var recordIds = Object.keys(req.body)

  for (let index = 0; index < recordIds.length; index++) {
    const singleId = parseInt(recordIds[index]);

   db.LogHours.update({
       approved: true,
   },
     {
      where: {
        id: singleId
      }
    })
  }


  res.redirect('/admin-dash')
})


 
db.sequelize.sync().then(function() {
  app.listen(Port, function () {
      console.log("server is live....");
  })
});


