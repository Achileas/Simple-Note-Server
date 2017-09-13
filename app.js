//Including the required modules
var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

var routes = require("./routes/routes.js");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

app.use("/rest", routes);

//Setting port for listening
app.listen(8080, function(req, res) {
	console.log("Server is running on 8080...\n");
});
