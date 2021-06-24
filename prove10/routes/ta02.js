//TA02 PLACEHOLDER
// Remember, you can make more of these placeholders yourself! 
const express = require('express');
const router = express.Router();

const list = [];
let errors = [];
const findName = (name) => list.some(n => n.toLowerCase() === name.toLowerCase());

router.use('/adduser', (req, res, next) => {
    const name = req.body.name;

    const found = findName(name);
    errors = [];
    console.log(errors)

    if (!found) {
        list.push(name);
    } else {
        errors.push('User already exists');  
    }
    res.redirect('/ta02/');

});

router.post('/removeUser', (req, res, next) => {

    const removeName = req.body.removeName;
    const index = list.indexOf(removeName);
    const found = findName(removeName);

    errors = [];

    if (!found) {
        errors.push('User is not found.')
    }

    if (index !== -1) {
        list.splice(index, 1);
    }

    res.redirect('/ta02/');
});

router.get('/', (req, res, next) => {
    res.render('pages/ta02', {
        title: 'Team Activity 02',
        names: list,
        errors,
        path: '/ta02', // For pug, EJS 
        activeTA03: true, // For HBS
        contentCSS: true, // For HBS
    });
});


module.exports = router;