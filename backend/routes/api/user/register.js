// import framework
const express = require('express');
const register = express.Router();
const cors = require('cors');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');

const User = require('../../../models/User');

// configure server
register.use(cors());

// route accessability test
register.get('/', (req, res) => {
	res.send("This is the user / register route");
});

// PUBLIC | POST request to register a new user
register.post('/',
	      check('email', "Email is required").isEmail(),
	      check('password', "A password of length 6 or more is required").isLength({ min: 6 }),
	async (req, res) => {
		// check for error in input
		const validation_error = validationResult(req);
		if (!validation_error.isEmpty()) {
			res.status(400).json({
				errors: validation_error.array(),
			});
		} else {
			const { name, email, password } = req.body;
			try {
				let user = await User.findOne({email});
				if (user) {
					// The user exist in the database
					res.status(400).json({
						message: 'The user has already been registered'
					});
				} else {
					// The use is indeed new
					if (name === "") {
						name = "unnamed_user";
					}
					user = new User({
						name,
						email,
						password
					});
					const salt = await bcrypt.genSalt(10);
					user.password = await bcrypt.hash(password, salt);
					await user.save();
					// Send the json web token to the user
					const payload = {user:{id: user.id}};
					jwt.sign(payload,
                                     	config.get("jwtSecret"),
                                     	{expiresIn: "1 days"},
					(err, token) => {
						if (err) throw err;
						res.json({token});
					})
				}
			} catch (error) {
				res.status(500).json({
                            	errors: "server error",
				});
				console.log(error);
			}
		}
	}
);


module.exports = register;
