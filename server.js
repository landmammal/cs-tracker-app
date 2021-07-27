const express = require('express')
const app = express()
 
// app routes

// home route
app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(3000, function () {
    console.log("server is live....");
})