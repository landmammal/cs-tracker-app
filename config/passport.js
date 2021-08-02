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

        console.log(req.body);

        db.User.create({
          // ANTHONY FINSIHED ADDING ALL OUR USERS INFO
          email: email,
          password: password,
          name: req.body.name,
          total_hours: 100,

          // add the rest of the fields
          
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
  console.log("serializing user: ", user.id);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;