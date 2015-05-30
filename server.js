var express = require("express");
var app = express();

app.set("port", (process.env.PORT || 5000));
app.use(express.static(__dirname + "/tracker"))

app.get("/secret", function(req, res) {
  var secret = process.env.SECRET || "Bad kittenz!"

  console.log(secret);
  res.send(secret);
})

app.get("/*", function(req, res) {
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

app.listen(app.get("port"), function() {
  console.log("Node app is running on port", app.get("port"));
})
