const supertest = require("supertest");
const request= supertest("http://localhost:8000");
const chai= require("chai");
const expect= chai.expect;

describe("get /device", function() {
	it("Gets list of devices", function() {
		return request
		.get("/api/v1/device")
		.then(function(res) { 
			expect(res.statusCode).to.equal(200); 
			expect(res.body).to.be.an("object"); 
			expect(res.body).to.be.empty;
			console.log("test:", res.body);
		}); 
	});
});