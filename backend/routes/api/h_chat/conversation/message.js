// import framework
const express = require('express');
const cors = require('cors');
const { check, validationResult } = require('express-validator');

// configure server
const message = express.Router();
message.use(cors());

// check for route accessability
message.get('/', (req, res) => {
	res.send("This is the message route");
});

module.exports = message;
