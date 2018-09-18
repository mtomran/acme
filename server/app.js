"use strict";

const express = require("express");

const PORT = 8000;
const HOST = "0.0.0.0";
const NAME = "ACME REST Server"

const app = express();
app.get("/", (req, res) => {
  res.send("Welcome to "+ NAME);
});

app.listen(PORT, HOST);
console.log(`Running ${NAME} on http://${HOST}:${PORT}`);