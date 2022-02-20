// import framework
const express = require('express');
const gateway = express.Router();
const { check, validationResult } = require('express-validator');

// configure server
gateway.use(cors());

gateway.get('/', (req, res) => {
	res.send('This is the user route');
});

gateway.use('/register', require('./register.js'));

module.exports = gateway;
