"use strict";
global.utils= require("./lib/utils");
const express = require("express");

// request body parser middleware
const bodyParser= require("body-parser");

// morgan request logger
const morgan= require("morgan");

const MongoClient = require("mongodb").MongoClient;



const PORT = 8000;
const HOST = "0.0.0.0";
const NAME = "ACME REST Server";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("combined"));

app.get("/", (req, res) => {
	res.send("Welcome to "+ NAME);
});

app.use("/api/v1", require("./routes"));

// Use connect method to connect to the server
MongoClient.connect("mongodb://db:27017/acme", function (err, database) {
	if(err) throw new Error(err);

	console.log("Connected to DB successfully");	
	global.db = database;

	// running server after DB connection
	console.log(`Running ${NAME} on http://${HOST}:${PORT}`);
	app.listen(PORT, HOST);
});


module.exports = app;