const supertest = require("supertest");
const request= supertest("http://localhost:8000");
const chai= require("chai");
const expect= chai.expect;

describe("DELETE: /device", function() {
	it("Should delete all existing device", function() {
		return request
		.delete("/api/v1/device")
		.send({})
		.then(function(res) { 
			console.log("test:", res.body);
			expect(res.statusCode).to.equal(200); 
			expect(res.body).to.be.an("object"); 
			expect(res.body).to.have.all.keys("message", "error", "response");
			expect(res.body.error).to.equal(null);
			expect(res.body.message).to.have.string("delete");
			expect(res.body.message).to.have.string("successful");
			
		}); 
	});
});

describe("GET: /device", function() {
	it("Should get empty list of devices", function() {
		return request
		.get("/api/v1/device")
		.then(function(res) { 
			expect(res.statusCode).to.equal(200); 
			expect(res.body).to.be.an("object"); 
			expect(res.body).to.have.all.keys("message", "error", "response");
			expect(res.body.error).to.equal(null);
			expect(res.body.message).to.have.string("get");
			expect(res.body.message).to.have.string("successful");
			expect(res.body.response).to.be.an("array");
			expect(res.body.response).to.have.lengthOf(0);			
		}); 
	});
});

let deviceId= null;
describe("POST: /device", function() {
	it("Should add a new device", function() {
		return request
		.post("/api/v1/device")
		.send({title: "device_1", type: "car", sensors: {fuel: 100, engine: "ON"}})
		.then(function(res) { 
			expect(res.statusCode).to.equal(200); 
			expect(res.body).to.be.an("object"); 
			expect(res.body).to.have.all.keys("message", "error", "response");
			expect(res.body.error).to.equal(null);
			expect(res.body.message).to.have.string("add");
			expect(res.body.message).to.have.string("successful");
			expect(res.body.response).to.have.all.keys("id");
			deviceId= res.body.response.id;
			console.log("test:", res.body);
		}); 
	});
});

describe("GET: /device", function() {
	it("Should get get one device", function() {
		return request
		.get("/api/v1/device")
		.then(function(res) { 
			expect(res.statusCode).to.equal(200); 
			expect(res.body).to.be.an("object"); 
			expect(res.body).to.have.all.keys("message", "error", "response");
			expect(res.body.error).to.equal(null);
			expect(res.body.message).to.have.string("get");
			expect(res.body.message).to.have.string("successful");
			expect(res.body.response).to.be.an("array");
			expect(res.body.response).to.have.lengthOf(1);
			console.log("test:", res.body);
		}); 
	});
});

describe("POST: /device", function() {
	it("Should adds a new device", function() {
		return request
		.post("/api/v1/device")
		.send({title: "device_2", type: "car", sensors: {fuel: 95, engine: "OFF"}})
		.then(function(res) { 
			expect(res.statusCode).to.equal(200); 
			expect(res.body).to.be.an("object"); 
			expect(res.body).to.have.all.keys("message", "error", "response");
			expect(res.body.error).to.equal(null);
			expect(res.body.message).to.have.string("add");
			expect(res.body.message).to.have.string("successful");
			expect(res.body.response).to.have.all.keys("id");
			deviceId= res.body.response.id;
			console.log("test:", res.body);
		}); 
	});
});

describe("GET: /device", function() {
	it("Should get two devices", function() {
		return request
		.get("/api/v1/device")
		.then(function(res) { 
			expect(res.statusCode).to.equal(200); 
			expect(res.body).to.be.an("object"); 
			expect(res.body).to.have.all.keys("message", "error", "response");
			expect(res.body.error).to.equal(null);
			expect(res.body.message).to.have.string("get");
			expect(res.body.message).to.have.string("successful");
			expect(res.body.response).to.be.an("array");
			expect(res.body.response).to.have.lengthOf(2);
			console.log("test:", res.body);
		}); 
	});
});

describe("PUT: /device", function() {
	it("Should update an existing device", function() {
		return request
		.put("/api/v1/device")
		.send({id: deviceId,  title: "device_update", sensors: {fuel: 90, engine: "ON"}})
		.then(function(res) { 
			expect(res.statusCode).to.equal(200); 
			expect(res.body).to.be.an("object"); 
			expect(res.body).to.have.all.keys("message", "error", "response");
			expect(res.body.error).to.equal(null);
			expect(res.body.message).to.have.string("update");
			expect(res.body.message).to.have.string("successful");
			console.log("test:", res.body);
		}); 
	});
});


describe("GET: /device", function() {
	it("Should get two devices with updates", function() {
		return request
		.get("/api/v1/device")
		.then(function(res) { 
			expect(res.statusCode).to.equal(200); 
			expect(res.body).to.be.an("object"); 
			expect(res.body).to.have.all.keys("message", "error", "response");
			expect(res.body.error).to.equal(null);
			expect(res.body.message).to.have.string("get");
			expect(res.body.message).to.have.string("successful");
			expect(res.body.response).to.be.an("array");
			expect(res.body.response).to.have.lengthOf(2);
			expect(res.body.response[1].title).to.equal("device_update");
			console.log("test:", res.body);
		}); 
	});
});

describe("DELETE: /device", function() {
	it("Should delete an existing device", function() {
		return request
		.delete("/api/v1/device/"+deviceId)		
		.then(function(res) { 
			console.log("test:", res.body);
			expect(res.statusCode).to.equal(200); 
			expect(res.body).to.be.an("object"); 
			expect(res.body).to.have.all.keys("message", "error", "response");
			expect(res.body.error).to.equal(null);
			expect(res.body.message).to.have.string("delete");
			expect(res.body.message).to.have.string("successful");
			
		}); 
	});
});

describe("GET: /device", function() {
	it("Should get one device", function() {
		return request
		.get("/api/v1/device")
		.then(function(res) { 
			expect(res.statusCode).to.equal(200); 
			expect(res.body).to.be.an("object"); 
			expect(res.body).to.have.all.keys("message", "error", "response");
			expect(res.body.error).to.equal(null);
			expect(res.body.message).to.have.string("get");
			expect(res.body.message).to.have.string("successful");
			expect(res.body.response).to.be.an("array");
			expect(res.body.response).to.have.lengthOf(1);
			console.log("test:", res.body);
		}); 
	});
});