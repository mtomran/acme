"use strict";
const express = require("express");
const router = express.Router();
const socketHandler= require("../lib/socket").socketHandler;

router.get("/device", getDevice, utils.responseHandler);

router.post("/device", postDevice, socketHandler(), utils.responseHandler);

router.put("/device", putDevice, socketHandler(), utils.responseHandler);

router.delete("/device/:id", deleteDevice, socketHandler(), utils.responseHandler);

router.delete("/device", deleteAllDevices, socketHandler(), utils.responseHandler);

const ObjectID = require("mongodb").ObjectID;

/**
 * get list of devices
 * @param {Object} req express request object
 * @param {Object} res express respnse object
 * @param {Object} next calls next available middleware
 */
function getDevice(req, res, next) {
	const deviceCol= db.collection("devices");
	deviceCol.find({})
	.map(device=> { 
		device.id= device._id;
		delete device._id;
		return device;
	})
	.toArray()	
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
		req._socket= {id: result.insertedId, title: data.title, type: data.type, sensors: data.sensors};
		req._res= { response: { id: result.insertedId },  message: "add device `"+ data.title+ "` with ID `"+result.insertedId +"` successful", error: null };
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
	const deviceId= req.body.id;
	const data= {};
	data.sensors= req.body.sensors;
	data.title= req.body.title;
	data.type= req.body.type;
	deviceCol.updateOne({"_id": ObjectID(deviceId)}, { $set: data })
	.then(result => {
		req._socket= {id: deviceId, type: data.type, title: data.title, sensors: data.sensors};
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

	const deviceId= req.params.id;	

	deviceCol.deleteMany({ "_id": ObjectID(deviceId)})
	.then(result => {
		req._socket= {id: deviceId};
		req._res= { response: {deletedCount: result.deletedCount},  message: "delete device successful", error: null };
		next();
	})
	.catch(next);	
}

function deleteAllDevices(req, res, next){
	const deviceCol = db.collection("devices");	
	deviceCol.deleteMany({})
	.then(result => {
		req._socket= {};
		req._res= { response: {deletedCount: result.deletedCount},  message: "delete device successful", error: null };
		next();
	})
	.catch(next);	
}

module.exports = router;