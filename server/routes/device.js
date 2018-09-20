"use strict";
const express = require("express");
const router = express.Router();

router.get("/device", getDevice, utils.responseHandler);

router.post("/device", postDevice, utils.responseHandler);

router.put("/device", putDevice, utils.responseHandler);

router.delete("/device", deleteDevice, utils.responseHandler);

const ObjectID = require("mongodb").ObjectID;
function getDevice(req, res, next) {
	const deviceCol= db.collection("devices");
	deviceCol.find({}).toArray()
	.then(result => {
		req._res= { response: result,  message: "get device successful", error: null };
		next();
	})
	.catch(next);
	
}

function postDevice(req, res, next) {	
	const data= {};
	data.title= req.body.title;
	data.type= req.body.type;
	data.sensors= req.body.sensors;
	
	const deviceCol = db.collection("devices");
	deviceCol.insertOne(data)
	.then(result => {		
		req._res= { response: { deviceId: result.insertedId },  message: "add device `"+ data.title+ "` with ID `"+result.insertedId +"` successful", error: null };
		next();
	})
	.catch(next);	
}

function putDevice(req, res, next) {
	const deviceCol = db.collection("devices");	
	const deviceId= req.body.deviceId;
	const data= {};
	data.sensors= req.body.sensors;
	data.title= req.body.title;
	deviceCol.updateOne({"_id": ObjectID(deviceId)}, { $set: data })
	.then(result => {
		console.log("update result:", result);
		req._res= { response: { modifiedCount: result.modifiedCount },  message: "update device ID `"+deviceId +"` successful", error: null };
		next();
	})
	.catch(next);	
}

function deleteDevice(req, res, next) {
	const deviceCol = db.collection("devices");	
	let filter= {};

	const deviceId= req.body.deviceId;
	if(deviceId){
		filter= { "_id": ObjectID(deviceId)};
	}
	deviceCol.deleteMany(filter)
	.then(result => {		
		req._res= { response: {deletedCount: result.deletedCount},  message: "delete device successful", error: null };
		next();
	})
	.catch(next);	
}

module.exports = router;