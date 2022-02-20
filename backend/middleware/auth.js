// import frameworks
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
	const token = req.header('x-auth-token');

	if (!token) {
		res.status(401).json({
			message: "No token is found, auth failed",
		})
	} else {
		try {
			jwt.verify(token, config.get('jwtSecret'), (error, decode) => {
				if (error){
					res.status(401).json({
						message: "Token is invalid"
					});
				} else {
					req.user = decode.user;
					next()
				}
			});
		} catch (err) {
			res.status(500).json({
				message: "server error"
			});
		}
	}
};
