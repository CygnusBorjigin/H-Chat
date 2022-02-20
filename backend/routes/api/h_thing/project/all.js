// import framewarks
const express = require('express');
const all = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../../middleware/auth');
const cors = require('cors');

all.use(cors());

// import database schema
const User = require('../../../models/User');
const List = require('../../../models/List');


// GET request to get all the lists of a given user
// This is a private rout
all.get('/',
            auth,
            async (req, res) => {
               const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    res.status(400).json({
                        message: errors.array(),
                    });
                } else {
                    try {
                        const user = req.user.id; 
                        const allList = await List.find({user: user});
                        res.send(allList);
                    } catch (err) {
                       res.status(500).json({
                                message: err.message,
                            }); 
                    }
                } 
            });


module.exports = all;
