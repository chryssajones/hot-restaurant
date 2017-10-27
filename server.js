// dependencies
// ===============================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// starts express
// ======================================
var app = express();
var PORT = process.env.PORT || 3000;

// sets up body-parser for form input
// ====================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// sets up the patron array to accept new reservations, with sample data
// =========================================
var patrons = [{
	customerName: "Jackie Chan",
	customerEmail: "jackie@kungfu.org",
	phoneNumber: "9876543210",
	partySize: 4,
	customerID: 1
}, {
	customerName: "Tony Stark",
	customerEmail: "ironman@starkindustries.com",
	phoneNumber: "1234567890",
	partySize: 2,
	customerID: 2
}];

// Routes
// =============================================
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "new.html"));
});

app.get("/all", function(req, res) {
  res.json(patrons);
});


// handles new inputs
// =======================================
app.post("/api/new", function(req, res) {
  var newPatron = req.body;
  console.log(newPatron);
  patrons.push(newPatron);
  res.json(newPatron);
});


// starts the server to begin listening
// ========================================
app.listen(PORT, function() {
	console.log("Application is listening on port " + PORT);
});