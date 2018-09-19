"use strict";
const express = require("express");
const router = express.Router();

router.get("/device", getDevice, utils.responseHandler);

router.post("/device", postDevice, utils.responseHandler);

router.put("/device", putDevice, utils.responseHandler);

router.delete("/device", deleteDevice, utils.responseHandler);

function getDevice(req, res, next) {
	next();
}

function postDevice(req, res, next) {
	next();
}

function putDevice(req, res, next) {
	next();
}

function deleteDevice(req, res, next) {
	next();
}

module.exports = router;