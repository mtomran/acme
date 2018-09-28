/**
 * handler function for sending response json object
 * @param {Object} req express request object
 * @param {Object} res express response object
 */
function responseHandler(req, res) {
	res.json(req._res || {});
}

module.exports = {
	responseHandler: responseHandler
};