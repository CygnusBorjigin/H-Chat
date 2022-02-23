// import framework
const express = require('express');
const cors = require('cors');
const { check, validationResult } = require('express-validator');

// configure server
const conversation = express.Router();
conversation.use(cors());

// import modules
const auth = require('../../../../middleware/auth');
const User = require('../../../../models/User');
const Conversation = require('../../../../models/Conversation');

// check for route accessability
conversation.get('/', (req, res) => {
	res.send("this is the chat route");
});

// PRIVATE | POST create a new conversation
conversation.post('/', 
	auth,
	check('admin', 'A admin field is required').exists(),
	check('member', 'A member filed is required').exists(),
	async(req, res) => {
		// check if the required fields are in the req
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res.status(400).json({
					message: errors.array(),
				});
			} else {
				const { admin, member } = req.body;
				// check for length
				if (admin.length === 0){
					res.status(400).json({ message: "A user ID is required for the admin"});
				} else if (member.length < 2) {
					res.status(400).json({ message: "At least two members are required to start a conversation"});
				} else {
					// Create a new conversation
					const newConversation = new Conversation({
						conversationName: member.join(" "),
						groupChat: member.length === 2 ? false : true,
						user: member,
						latest: null,
						groupAdmin: admin
					});
					const saved_list = await newConversation.save();
					res.json(saved_list);
				}
			}
		} catch (err) {
			res.status(500).json({ message: "server error"});
			console.log(err);
		}
});

module.exports = conversation;
