"use strict";
global.utils= require("./lib/utils");
const express = require("express");

const bodyParser= require("body-parser");

// morgan request logger
const morgan= require("morgan");

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

app.listen(PORT, HOST);
console.log(`Running ${NAME} on http://${HOST}:${PORT}`);
module.exports = app;