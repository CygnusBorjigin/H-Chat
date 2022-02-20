// import framework
const express = require('express');
const register = express.Router();
const cors = require('cors');

// configure server
register.use(cors());

register.get('/', (req, res) => {
	res.send("This is the user / register route");
});

module.exports = register;
