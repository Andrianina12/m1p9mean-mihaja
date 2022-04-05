const express = require("express")
const app = express()
const bodyParser = require("body-parser");
const router = express.Router();
const cors = require('cors');

// repository
const login = require("./src/repository/Login");

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

// start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));