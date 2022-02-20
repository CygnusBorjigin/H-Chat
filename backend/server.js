// importing frameworks
const express = require('express');
const cors = require('cors');
const path = require('path');

// import modules
const connectDB = require('./config/db.js');

// configure the server
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
	res.send("The server is working");
});

app.get('/:id', (req, res) => {
	res.send(req.params);
});

// connect to top level route
app.use('/api/user', require('./routes/api/user/gateway.js'));
app.use('/api/auth', require('./routes/api/auth/gateway.js'));
app.use('/api/chat', require('./routes/api/h_chat/chat/gateway.js'));

const PORT = 5001;
app.listen(PORT, console.log(`Server is running on ${PORT}`));
