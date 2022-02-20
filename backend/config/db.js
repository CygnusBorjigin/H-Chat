// import frameworks
const mongoose = require('mongoose');
const config = require('config');


// import modules
const db = config.get('mongoURI');

// connect to the database
const connectToDB = async () => {
	try{
		await mongoose.connect(db);
		console.log("connected to the database");
	} catch (error) {
		console.log("Error occured when connecting to the database");
		console.log(error.message);
		process.exit(1);
	}
};

module.exports = connectToDB;
