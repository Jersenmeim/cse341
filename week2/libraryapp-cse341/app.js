const http = require('http');
const express  = require('express');
const bodyParser = require('body-parser');

const app = express ();
var PORT = process.env.PORT || 3000;


const path = require('path');
const addbook = require('./routes/book')
//const shoproutes = require('./routes/shop')



app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(addbook.routes);
//app.use(shoproutes);

app.use((req, res, next)=>{
    res.status(404).render('404', {title: 'error 404'});
})
const server = http.createServer(app);
server.listen(PORT);