const express = require("express")
const app = express()
const bodyParser = require("body-parser");
const router = express.Router();
const cors = require('cors');

// repository
const login = require("./src/repository/Login");
const client = require("./src/repository/Client");

app.use(cors({
  origin: '*'
}));

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// add router in the Express app.
app.use("/", router);

// use the express-static middleware
app.use(express.static("public"))

// define the first route
router.get("/", function (req, res) {
  res.send("<h1>Hello World!</h1>")
})


router.post("/login", async function(req, res){
  var response = await login.login(req.body);
  res.json(response);
});

router.post("/inscription", async function(req, res){
  var response = await login.inscrire(req.body);
  res.json(response);
});


router.get("/restaurants", async function(req, res){
  var response = null;
  var token = req.headers['authorization'];
  response =  await login.verifyToken(token);
  if(response == null) {
     response = await client.listResto();
  }
  res.json(response);
});

router.post("/commander", async function(req, res){
  var response = null;
  var token = req.headers['authorization'];
  response =  await login.verifyToken(token);
  if(response == null) {
     response = await client.commander(req.body);
  }
  res.json(response);
});

router.get("/config", async function(req, res){
  var response = null;
  response = await login.getConfig();
  res.json(response);
})
// start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));