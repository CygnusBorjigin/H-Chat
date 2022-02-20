// import frameworks
const express = require('express');
const item = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../../middleware/auth');
const cors = require('cors');

item.use(cors());

// import database schema
const User = require('../../../models/User');
const List = require('../../../models/List');

// Handel requests
item.get('/', (req, res) => {
	res.send('This is the project/item route');
});


// POST request to add an item to the list
// This is a private rout
item.post('/',
            auth,
            check('list_id', 'A vaild list id is required').not().isEmpty(),
            check('item_name', 'A valid item it required').not().isEmpty(),
            async (req, res) => {
		    // check for errors in the input
		    const errors = validationResult(req);
		    if (!errors.isEmpty()) {
			    res.status(400).json({
				    message: errors.array()
			    });
		    } else {
			    try {
				    //check if the user owns the list
				    const user = req.user.id;
				    const list = await List.findById(req.body.list_id);
				    const list_owner = list.user;
				    if (user == list_owner) {
					    const new_item = {
						    content: req.body.item_name
					    };
					    list.items = [...list.items, new_item];
					    list.save();
					    res.json(list);
				    } else {
					    res.status(500).json({
						    message: 'The user does not have access to this list',
					    })
				    }
			    } catch (err) {
				    res.status(500).json({
					    message: "server error, item",
					    error: err.message
				    });
			    }
		    }
	    });

// DELETE request to delete an item from the list
// This is a private rout
item.delete('/',
            auth,
            check('list_id', 'A vaild list id is required').not().isEmpty(),
            check('item_name', 'A valid item it required').not().isEmpty(),
            async (req, res) => {
                // check for errors in the input
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    res.status(400).json({
                        message: errors.array(),
                    });
                } else {
                    try {
                        //check if the user owns the list
                        const user = req.user.id;
                        const list = await List.findById(req.body.list_id);
                        const list_owner = list.user;
                        if (user == list_owner) {
                            list.items = list.items.filter(eachitem => eachitem !== req.body.item_name);
                            list.save();
                            res.json(list);
                        } else {
                            res.status(500).json({
                                message: 'The user does not have access to this list',
                            })
                        }
                    } catch (err) {
                        res.status(500).json({
                                message: err.message,
                            });
                    }
                }
            });

// PUT request to modify a item in a list
// This is a private rout
item.put('/',
            auth,
            check('list_id', 'A valid list id is required').not().isEmpty(),
            check('item_name', 'A valid item name is required').not().isEmpty(),
            check('new_item_name', 'A valid new item name is required').not().isEmpty(),
            async (req, res) => {
                // check for any error in the input
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    res.status(400).json({
                        message: errors.array(),
                    });
                } else {
                   try {
                        //check if the user owns the list
                        const user = req.user.id;
                        const list = await List.findById(req.body.list_id);
                        const list_owner = list.user;
                        if (user == list_owner) {
                            list.items = list.items.map(each_item => {
                                if (each_item !== req.body.item_name) {
                                    return each_item;
                                } else {
                                    return req.body.new_item_name;
                                }
                            });
                            list.save();
                            res.json(list);
                        } else {
                            res.status(500).json({
                                message: 'The user does not have access to this list',
                            })
                        }
                    } catch (err) {
                        res.status(500).json({
                                message: err.message,
                            });
                    }
                }
            }
            );


module.exports = item;
