// import framework
const express = require('express');
const cors = require('cors');

// configure server
const conversation = express.Router();
conversation.use(cors());

conversation.get('/', (req, res) => {
	res.send("this is the chat route");
});

module.exports = conversation;
