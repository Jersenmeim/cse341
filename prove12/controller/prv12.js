const express = require('express');
const router = express.Router();



const users = [] // Dummy array for users
const colors = ['',
    'red',
    'yellow',
    'green',
    'blue',
    'purple',
    'orange'
]


exports.getlogin = (req, res, next) => {
    res.render('pages/prv12-1', {
        title: 'Prove Assignment 12',
        path: '/prv12'
    })
}

// Verify login submission to access chat room.
exports.postlogin = (req, res, next) => {
    if (!users.find(name => name == req.body.username)) {
        req.session.user = req.body.username;
        users.push(req.body.username);
        res.json({
            message: "Success"
        });
    } else
        res.json({
            message: "Error, username already used"
        });

}

// Render chat screen.
exports.getchat = (req, res, next) => {
    // This route is simple, just render the chat page.
    const color = colors[users.length % colors.length];

    res.render('pages/prv12-2', {
        title: 'Prove Assignment 12',
        path: '/prv12/chat',
        // Pass in the user saved in the session
        user: req.session.user,
        color: color
    })
}

exports.postlogout = (req, res, next) => {
    // This route is simple, just render the chat page.
    const index = users.findIndex(name => name == req.body.username);

    //Delete the item from the array
    users.splice(index, 1);

    req.session.destroy(() => {
        res.json({
            message: "Success"
        });
    })

}