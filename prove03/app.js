const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
var PORT = process.env.PORT || 3000;
//routes
const addproduct = require('./routes/add-product-r')
const shoproutes = require('./routes/shop-r')

//controller
const productController = require('./controller/404')



app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(addproduct.routes);
app.use(shoproutes);

app.use(productController.get404)
const server = http.createServer(app);
server.listen(PORT);;