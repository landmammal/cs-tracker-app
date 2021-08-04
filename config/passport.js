let passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;
const db = require("../models");

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true
    },
    function(req, email, password, done) {
      db.User.findOne({ where: { email: email } }).then(function(err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, false, { message: "That email is already taken." });
        }

        var schoolCode = "admin";
        var permission = false;

        if (req.body.code) {
          if (req.body.code === schoolCode) {
           permission = true;
          }
        }
        
        db.User.create({
          // ANTHONY FINSIHED ADDING ALL OUR USERS INFO
          email: email,
          password: password,
          name: req.body.name,
          school: req.body.school,
          student_id: req.body.student_id,
          total_hours: 100,
          done_hours: 0,
          admin: permission
      
        }).then(function(newUser) {
          if (newUser) {
            return done(null, newUser);
          }
        });

      });
    }
  )
);

passport.use(  "local-signin",
  new LocalStrategy(
    {
      usernameField: "email"
    },
    function(email, password, done) {
      db.User.findOne({ where: { email: email } }).then(function(user) {
        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      });
    }
  )
);

passport.serializeUser((user, done) => {
  // console.log("serializing user: ", user.id);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
