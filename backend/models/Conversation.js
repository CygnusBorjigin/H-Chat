const mongoose = require('mongoose');

const ChatSchema = mongoose.Schema(
	{
		conversationName: { type: String, trim: true },
		group: { type: Boolean, default: false },
		user: [ { type: mongoose.Schema.Types.ObjectId, ref: "User"} ],
		latest: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
		groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
	},
	{
		timestamps: true, 
	}
);

module.exports = mongoose.model('Chat', ChatSchema);
