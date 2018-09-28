let io;
/**
 * handler to send socket notification
 */
function socketHandler(){
	return function(req, res, next){
		var event= req.socketEvent || eventBuilder(req);
		
		io.emit(event, req._socket);

		next();
	};	
}


/**
 * creates a generic event name based on the route method and path
 * with format method:path
 * 
 * @param {Object} req - request object
 * @returns {String} event name
 */
function eventBuilder(req){
	var method = req.route.stack[0].method;
	var path = req.route.path;
	var event = method + ":" + path.replace(/\//g, "/");
	return event;
}

module.exports = function (server) {
	// initializing socket.io server
	io = require("socket.io")(server, {
		serveClient: false,
		// below are engine.IO options
		pingInterval: 10000,
		pingTimeout: 5000,
		cookie: false
	});

	io.sockets
	.on("connection", (socket) => {
		console.log("Socket connected. ID:", socket.id);		
	});
};

module.exports.socketHandler= socketHandler;