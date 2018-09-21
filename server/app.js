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
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
	serveClient: false,
	// below are engine.IO options
	pingInterval: 10000,
	pingTimeout: 5000,
	cookie: false
});

io.sockets
.on("connection", (socket)=> {
	console.log("Socket connected", socket);
	setTimeout(()=>{
		io.emit("post:/device", {_id: "fsdfwer34rwer235432", title: "honda civic", type: "car", sensors: { fuel: 90, engine: "OFF"}});
	}, 3000);
	
	setTimeout(()=>{
		io.emit("put:/device", {_id: "fsdfwer34rwer235432", title: "Masoud's honda civic", sensors: { fuel: 80, engine: "ON"}});
	}, 6000);

	setTimeout(()=>{
		io.emit("delete:/device", {_id: "fsdfwer34rwer235432"});
	}, 9000);
	
});



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("combined"));

app.get("/api/v1", (req, res) => {
	res.json({ message: "Welcome to "+ NAME });
});

app.use("/api/v1", require("./routes"));

// Use connect method to connect to the server
MongoClient.connect("mongodb://root:secret@db:27017", function (err, client) {
	if(err) throw new Error(err);

	console.log("Connected to DB successfully");	
	global.db = client.db("acme");

	// running server after DB connection
	console.log(`Running ${NAME} on http://${HOST}:${PORT}`);
	server.listen(PORT, HOST);
});


module.exports = app;