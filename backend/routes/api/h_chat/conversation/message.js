// import framework
const express = require('express');
const cors = require('cors');
const { check, validationResult } = require('express-validator');

// configure server
const message = express.Router();
message.use(cors());

// import modules
const auth = require('../../../../middleware/auth');
const User = require('../../../../models/User');
const Conversation = require('../../../../models/Conversation');
const Message = require('../../../../models/Message');

// check for route accessability
message.get('/', (req, res) => {
	res.send("This is the message route");
});

// PRIVATE | POST create a new message
message.post('/',
	auth,
	check('conversationID', 'The ID for the conversation is required'),
	check('content', 'Message content is needed to send a message'),
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) return res.status(400).json({ message: errors.array() });

			const { conversationID, content } = req.body;
			// check for access
			const post_conversation = await Conversation.findById(conversationID);
			if (post_conversation === null) res.status(400).json({ message: "The conversation does not exist"});
			if (!post_conversation.user.includes(req.user.id)) return res.status(401).json({ message: "The user is not a member of the conversation"});

			// create the message
			const newMessage = new Message({
				sender: req.user.id,
				content,
				chat: post_conversation
			});

			const posted_message = await newMessage.save();
			res.send(posted_message);
		} catch (err) {
			console.log(err);
			res.status(500).json({ message: "server error"});
		}
	});


module.exports = message;
