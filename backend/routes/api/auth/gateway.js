// import framework
const express = require('express');
const cors = require('cors');

// confirgure server
gateway = express.Router();
gateway.use(cors());

gateway.get('/', (req, res) => {
	res.send("This is the auth path");
});

gateway.use('/authenticate', require('./authenticate.js'));

module.exports = gateway;
