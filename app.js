const express = require("express")
const login = require("./src/repository/Login");
const app = express()

// use the express-static middleware
app.use(express.static("public"))

// define the first route
app.get("/", function (req, res) {
  res.send("<h1>Hello World!</h1>")
})

app.get("/login", async function(req, res){
  var user = {email: "satandrianina@gmail.com", modtdepasse: "m1p9mean"};
  var response = await login.login(user);
  console.log("Js", response);
  res.json(response);
});

// start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));