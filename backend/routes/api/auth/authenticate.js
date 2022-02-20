// import framework
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

// import modules
const auth = require('../../../middleware/auth.js');
const User = require('../../../models/User');

// configure server
authenticate = express.Router();
authenticate.use(cors());

// check route accessability
authenticate.get('/', (req, res) => {
	res.send("This is the auth / authenticate route");
});

// PUBLIC | POST request to login a user
authenticate.post('/',
		check('email', "A valid email is required").isEmail(),
		check('password', "A valid password is requred").exists(),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			// check for errors in the input
			res.status(400).json({
				message: errors.array()
			});
		} else {
			const { email, password } = req.body;
			try {
				// locate the user in the database
				let user = await User.findOne({ email });
				if (!user) {
					res.status(400).json({
						message: "User does not exist"
					});
				} else {
					const matches = await bcrypt.compare(password, user.password);
					if (!matches) {
						res.status(400).json({
							message: "Wrong Password"
						});
					} else {
						const payload = { user: { id: user.id } };
						jwt.sign(
							payload,
							config.get('jwtSecret'),
							{ expiresIn : '1 days' },
							(err, token) => {
								if (err) throw err;
								res.json({ token });
							});
					}
				}
			} catch (err) {
				res.status(500).json({
					message: "server error"
				});
			}
		}
});



module.exports = authenticate;
