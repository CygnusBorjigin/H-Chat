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
			if (!errors.isEmpty()) return res.status(400).json({ message: errors.array(), });

			const { admin, member } = req.body;
			// check for length
			if (admin.length === 0) return res.status(400).json({ message: "A user ID is required for the admin"});
			if (member.length < 2) return res.status(400).json({ message: "At least two members are required to start a conversation"});
					
			const check_exist = await Conversation.find({member: ["someone", "someoneesle"]});
			
			if (check_exist !== []) return res.status(400).json({ message: "This conversation already exist"});
					
			// get the name of the users
			const user_names = await Promise.all(member.map(async each => {
				const user_name = await User.findById(each);
				return user_name.name;
			}));
			// Create a new conversation
			const newConversation = new Conversation({
				conversationName: user_names.join(' '),
				groupChat: member.length === 2 ? false : true,
				user: member,
				latest: null,
				groupAdmin: admin
			});
			const saved_list = await newConversation.save();
			res.json(saved_list);
		} catch (err) {
			res.status(500).json({ message: "server error"});
			console.log(err);
		}
});

// PRIVATE | PUT add a new member to the conversation
conversation.put('/addmember',
	auth,
	check('admin', 'An user ID is need to verify access').exists(),
	check('new_member', 'An user ID is needed to add new user').exists(),
	async (req, res) => {
		//check if anything is messing in the req
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(400).json({ message: errors.array()});
		res.send(req.user);
	})


















module.exports = conversation;
