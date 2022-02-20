// import framework
const express = require('express');
const cors = require('cors');

// configure server
const gateway = express.Router();

// check route accessability
gateway.get('/', (req, res) => {
	res.send('This is the chat route');
});

module.exports = gateway;