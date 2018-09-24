"use strict";
const express = require("express");
const router = express.Router();
const socketHandler= require("../lib/socket").socketHandler;

router.get("/device", getDevice, utils.responseHandler);

router.post("/device", postDevice, socketHandler(), utils.responseHandler);

router.put("/device", putDevice, socketHandler(), utils.responseHandler);

router.delete("/device", deleteDevice, socketHandler(), utils.responseHandler);

const ObjectID = require("mongodb").ObjectID;

/**
 * get list of devices
 * @param {Object} req express request object
 * @param {Object} res express respnse object
 * @param {Object} next calls next available middleware
 */
function getDevice(req, res, next) {
	const deviceCol= db.collection("devices");
	deviceCol.find({}).toArray()
	.then(result => {
		req._res= { response: result,  message: "get device successful", error: null };
		next();
	})
	.catch(next);
	
}

/**
 * adds a new device
 * @param {Object} req express request object
 * @param {Object} res express respnse object
 * @param {Object} next calls next available middleware
 */
function postDevice(req, res, next) {	
	const data= {};
	data.title= req.body.title;
	data.type= req.body.type;
	data.sensors= req.body.sensors;
	
	const deviceCol = db.collection("devices");
	deviceCol.insertOne(data)
	.then(result => {
		req._socket= {_id: result.insertedId, title: data.title, type: data.type, sensors: data.sensors};
		req._res= { response: { deviceId: result.insertedId },  message: "add device `"+ data.title+ "` with ID `"+result.insertedId +"` successful", error: null };
		next();
	})
	.catch(next);
}

/**
 * updates an existing device
 * @param {Object} req express request object
 * @param {Object} res express respnse object
 * @param {Object} next calls next available middleware
 */
function putDevice(req, res, next) {
	const deviceCol = db.collection("devices");	
	const deviceId= req.body.deviceId;
	const data= {};
	data.sensors= req.body.sensors;
	data.title= req.body.title;
	deviceCol.updateOne({"_id": ObjectID(deviceId)}, { $set: data })
	.then(result => {
		req._socket= {_id: deviceId, title: data.title, sensors: data.sensors};
		req._res= { response: { modifiedCount: result.modifiedCount },  message: "update device ID `"+deviceId +"` successful", error: null };
		next();
	})
	.catch(next);	
}

/**
 * deletes all or one device(s)
 * @param {Object} req express request object
 * @param {Object} res express respnse object
 * @param {Object} next calls next available middleware
 */
function deleteDevice(req, res, next) {
	const deviceCol = db.collection("devices");	
	let filter= {};

	const deviceId= req.body.deviceId;
	// if device ID is provided only delete the corresponding device
	// otherwise delete all
	if(deviceId){
		filter= { "_id": ObjectID(deviceId)};
	}

	deviceCol.deleteMany(filter)
	.then(result => {
		req._socket= {_id: deviceId};
		req._res= { response: {deletedCount: result.deletedCount},  message: "delete device successful", error: null };
		next();
	})
	.catch(next);	
}

module.exports = router;