// dependencies
// ===============================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var tableData = require("./data/tableData");
var waitListData = require("./data/waitinglistData");

// starts express
// ======================================
var app = express();
var PORT = process.env.PORT || 8080;


// sets up body-parser for form input
// ====================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json());


// Routes
// =============================================

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/view", function(req, res) {
	res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/new", function(req,res) {
	res.sendFile(path.join(__dirname, "new.html"));
});

app.get("/api/tables", function(req, res) {
  res.json(tableData);
});

app.get("/api/waitlist", function(req, res) {
  res.json(waitListData);
});

app.get("/all", function(req, res) {
  res.json(tableData);
  res.json(waitingListData);
  console.log(tableData);
  console.log(waitListData);
});


// handles new inputs
// =======================================
app.post("/api/tables", function(req, res) {

	if (tableData.length < 5) {
	  tableData.push(req.body);
	  res.json(true);
	} else {
		waitListData.push(req.body);
		res.json(false);
	}
});

app.post("/api/clear", function() {
	tableData = [];
	waitListData = [];
});


// starts the server to begin listening
// ========================================
app.listen(PORT, function() {
	console.log("Application is listening on port " + PORT);
});