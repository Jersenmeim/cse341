//TA03 PLACEHOLDER
const express = require('express');
const router = express.Router();

const request = require('request');


const jsonData = [];
let url = "https://byui-cse.github.io/cse341-course/lesson03/items.json";
let options = {
    json: true
}; // request to automatically parse the response's body as JSON if there's no error


//read from a url
request(url, options, (error, res, body) => {
    if (error) {
        return console.log(error)
    };
    if (!error && res.statusCode == 200) {
        jsonData.push(body)
    };
});

router.get('/', (req, res, next) => {

    res.render('pages/ta03', {
        title: 'Team Activity 03',
        listofdata: jsonData,
        path: '/ta03', // For pug, EJS 
        activeTA03: true, // For HBS
        contentCSS: true, // For HBS
    });
});

module.exports = router;