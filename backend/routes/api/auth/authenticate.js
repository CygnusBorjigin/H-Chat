// import framework
const express = require('express');
const cors = require('cors');

// configure server
authenticate = express.Router();
authenticate.use(cors());

// check route accessability
authenticate.get('/', (req, res) => {
	res.send("This is the auth / authenticate route");
});

module.exports = authenticate;
