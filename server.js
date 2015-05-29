var express = require("express");
var app = express();

app.use(express.static("./tracker"))

app.get("/secret", function(req, res) {
  res.send("Kittenz can haz cheezburgerz!");
})

app.use("/", function(req, res) {
  var options = {
    root: __dirname + "/tracker/"
  }

  res.sendFile("./404.html", options, function(err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    } else {
      console.log("Sent: 404.html");
    }
  })
})

var server = app.listen(5000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s.%s", host, port);
})
