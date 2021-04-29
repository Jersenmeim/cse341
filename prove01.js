const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 3000 

const app = express();
const prove01Routes = require('./prove01-routes');

app.use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .use(express.urlencoded({
        extended: false
    }))
    .use('/', prove01Routes)
    .use((req, res, next) => {
        // 404 page
        res.render('pages/404', {
            title: '404 - Page Not Found',
            path: req.url
        })
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));