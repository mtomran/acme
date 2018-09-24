var express = require("express");
var router = express.Router();

router.use("/", require("./device_route"));

module.exports= router;