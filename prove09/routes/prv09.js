const express = require('express');
const app = express();

const controller = require('../controller/prv09');

app.get('/', (req, res, next) => {
        res.render('pages/prv09', {
            title: 'Prove 09',
            path: '/prv09',
        });
    })
    .get('/pokemon/:page', (req, res, next) => {
        const page = req.params.page;
        controller.getdata(page, (pokemon) => {
            res.render('pages/pokemon', {
                pokemonList: pokemon,
                page: page
            });
        });
    });

module.exports = app;