// importing frameworks
const express = require('express');
const cors = require('cors');
const path = require('path');

// import modules
const connectDB = require('./config/db.js');

// configure the server
const app = express();
app.use(cors());

connectDB();

app.get('/', (req, res) => {
	res.send("The server is working");
});

app.get('/:id', (req, res) => {
	res.send(req.params);
});

app.listen(5001, console.log("server running on 5001"));
