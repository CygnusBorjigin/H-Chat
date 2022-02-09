const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema(
	{
	sender: { type: mongoose.Shcema.Types.ObjectId, ref: "User" },
	content: { type: String, trim: true },
	chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" }
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Message', MessageSchema);