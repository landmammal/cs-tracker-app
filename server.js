const express = require('express')
const app = express()
 
// app routes

// student profile route
app.get('/profile', function (req, res) {
  console.log("you hit the profile route");
  res.send('profile page here')
})

// student log hours route (anthony)

// log in route (brandon)

// registration route (brandon)


// admin login route (anthony)

// admin registration route (antony)

// admin dash route (keshari)

// admin single student route (keshari)



 
app.listen(3000, function () {
    console.log("server is live....");
})