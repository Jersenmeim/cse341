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
const productController = require('./controller/404');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');



app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    User.findById('609be9b9bdce6f87cf00eb7b').then(user => {
        req.user = new User(user.name, user.email, user.cart, user._id);
        next();
    }).catch(err => {
        console.log(err);
    })
})

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(addproduct.routes);
app.use(shoproutes);

app.use(productController.get404)
const server = http.createServer(app);

mongoConnect(() => {
    server.listen(PORT);

})