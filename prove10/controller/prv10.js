const express = require('express');
const router = express.Router();

const avengersName = require('../data/avengers.json')

exports.getprove10 = (req, res) => {
    res.render('pages/prv10', {
        title: 'Prove Me 10',
        path: '/prv10',
    });
}

exports.getAvengers = (req, res) => {
    res.json(avengersName);
}
exports.postHero = (req, res) => {
    if ((req.body.newName !== undefined) || (req.body.newPower !== undefined)) {
        const newName = req.body.newName
        const newPower = req.body.newPower
        if (!avengersName.avengers.some(a => a.name === newName) && newPower !== '') {
            avengersName.avengers.push({
                name: newName,
                power: newPower, 

            })
            res.sendStatus(200)
        }
    } else {
        res.sendStatus(400)
    }
}