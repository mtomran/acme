"use strict";
const express = require("express");
const router = express.Router();
const socketHandler= require("../lib/socket").socketHandler;

/**
 * @api	{get} /device get all devices
 * @apiName 		GetDevice
 * @apiGroup 		device
 * @apiDescription	Gets all devices information stored in the DB
 *
 * @apiSuccess	{[Object]} response array of device objects
 * @apiSuccess	{String} response.id device ID
 * @apiSuccess	{String} response.title device title
 * @apiSuccess	{String} response.type device type
 * @apiSuccess	{Object} response.sensors device sensors json object
 * @apiSuccess  {String} message human readable message
 * @apiSuccess  {String} error error type, null if no error
 */
router.get("/device", getDevice, utils.responseHandler);


/**
 * @api	{post} /device add new device
 * @apiName 		PostDevice
 * @apiGroup 		device
 * @apiDescription	inserts a new device into the DB
 *
 * @apiParam  {String} title device title
 * @apiParam  {String} type device type
 * @apiParam  {Object} sensors device sensors json object
 * @apiSuccess  {Object} response device update response object
 * @apiSuccess	{String} response.id device ID
 * @apiSuccess  {String} message human readable message
 * @apiSuccess  {String} error error type, null if no error
 */
router.post("/device", postDevice, socketHandler(), utils.responseHandler);

/**
 * @api	{put} /device update an existing device
 * @apiName 		PutDevice
 * @apiGroup 		device
 * @apiDescription	updates an existing device in the DB
 *
 * @apiParam  {String} id device ID
 * @apiParam  {String} title device title
 * @apiParam  {String} type device type
 * @apiParam  {Object} sensors device sensors json object
 * @apiSuccess  {Object} response device update response object
 * @apiSuccess	{Number} response.modifiedCount number of records modified
 * @apiSuccess  {String} message human readable message
 * @apiSuccess  {String} error error type, null if no error
 */
router.put("/device", putDevice, socketHandler(), utils.responseHandler);

/**
 * @api	{delete} /device/:id delete a device
 * @apiName 		DeleteDevice
 * @apiGroup 		device
 * @apiDescription	deletes a device information stored in the DB
 *
 * @apiParam  {String} id device ID
 * @apiSuccess	{[Object]} response object for device delete
 * @apiSuccess	{Number} response.deletedCount number of records deleted
 * @apiSuccess  {String} message human readable message
 * @apiSuccess  {String} error error type, null if no error
 */
router.delete("/device/:id", deleteDevice, socketHandler(), utils.responseHandler);

/**
 * @api	{delete} /device delete all devices
 * @apiName 		DeleteAllDevices
 * @apiGroup 		device
 * @apiDescription	deletes all devices information stored in the DB
 *
 * @apiSuccess	{[Object]} response object for device delete
 * @apiSuccess	{Number} response.deletedCount number of records deleted
 * @apiSuccess  {String} message human readable message
 * @apiSuccess  {String} error error type, null if no error
 */
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
 * deletes one device
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

/**
 * deletes all devices
 * @param {Object} req express request object
 * @param {Object} res express respnse object
 * @param {Object} next calls next available middleware
 */
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