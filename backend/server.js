const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send("The srever is working");
});

app.get('/:id', (req, res) => {
	res.send(req.params);
});

app.listen(5001, console.log("server running on 5001"));
