const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res, next) => {
    res.render('pages/prove01', {
        title: 'Prove 01 Assignment',
        path: '/prove01'
    })
});

router.get('/users', (req, res, next) => {
    const list = JSON.parse(fs.readFileSync('names.json'));
    res.render('pages/user', {
        title: 'Prove 01 Assignment | User List',
        path: '/prove01',
        userData: list
    })
});

router.post('/create-user', async (req, res, next) => {
    const user = req.body.username;
    const list = JSON.parse(fs.readFileSync('names.json'));
    list.push(user);
    fs.writeFileSync('names.json', JSON.stringify(list));
    console.log(user);
    // keep user on the original page
    res.redirect('/');
})

module.exports = router;