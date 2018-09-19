function responseHandler(req, res) {
	res.json(req._res || {});
}

module.exports = {
	responseHandler: responseHandler
};