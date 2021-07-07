const express = require('express')
const router = express.Router()

const users = [] // Dummy array for users
const colors = ['',
    'red',
    'yellow',
    'green',
    'blue',
    'purple',
    'orange'
]

router.get('/', (req, res, next) => {
    res.render('pages/prv12-1', {
        title: 'Prove Activity 12',
        path: '/proveActivities/12'
    })
})

// Verify login submission to access chat room.
router.post('/login', (req, res, next) => {
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

})

// Render chat screen.
router.get('/chat', (req, res, next) => {
    const color = colors[users.length % colors.length];
    res.render('pages/prv12-2', {
        title: 'Prove Activity 12',
        path: '/proveActivities/12chat',
        user: req.session.user,
        color: color
    });
})

router.post('/logout', (req, res, next) => {
    const index = users.findIndex(name => name == req.body.username);

    //Delete the item from the array
    users.splice(index, 1);

    req.session.destroy(() => {
        res.json({
            message: "Success"
        });
    })

});

module.exports = router