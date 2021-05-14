const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const cors = require('cors')
var PORT = process.env.PORT || 3000;
//routes
const addproduct = require('./routes/add-product-r')
const shoproutes = require('./routes/shop-r')

//controller
const productController = require('./controller/404');
const mongoConnect = require('./util/database').mongoConnect;
var User = require('./models/user');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    User.findById('609e2db0d379aa3028a8dda8').then(user => {
        req.user = user;
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

const corsOptions = {
    origin: "https://ecommerceproveme4.herokuapp.com/",
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// mongoConnect(() => {
//     app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
// });

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    family: 4
};

const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://jersenmeim:j3rs3nm31m1196@cluster0.qnn4a.mongodb.net/shop?retryWrites=true&w=majority";
mongoose.connect(MONGODB_URL, options).then(result => {
    User.findOne().then(user => {
        if (!user) {
            const user = new User({
                name: 'Max',
                email: 'max@test.com',
                cart: {
                    items: []
                }
            });
            user.save();
        }
    });

    app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
}).catch(err => {
    console.log(err);
})