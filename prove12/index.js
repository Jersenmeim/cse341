const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 5000 // So we can run on heroku || (OR) localhost:5000
const http = require('http');
const app = express();
const cors = require('cors');
const request = require('request');
const session = require('express-session');


// Route setup. You can implement more in the future!
const ta01Routes = require('./routes/ta01');
const ta02Routes = require('./routes/ta02');
const ta03Routes = require('./routes/ta03');
const ta04Routes = require('./routes/ta04');
const proveme08 = require('./routes/prv08');
const proveme09 = require('./routes/prv09');
const proveme10 = require('./routes/prv10');
const proveme11 = require('./routes/prv11');
const proveme12 = require('./routes/prv12');
const indexMain = require('./routes/main');

app.use(bodyParser({
  extended: false
}))

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// For parsing the body of a POST

app.use(bodyParser.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
const corsOptions = {
  origin: "https://cse341-proveme.herokuapp.com/",
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));



const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  family: 4
};

app.use(
  session({
    // Simple and not very secure session
    secret: 'random_text',
    cookie: {
      httpOnly: false // Permit access to client session
    }
  })
)


app.use('/ta01', ta01Routes);
app.use('/ta02', ta02Routes);
app.use('/ta03', ta03Routes);
app.use('/ta04', ta04Routes);
app.use('/prv08', proveme08);
app.use('/prv09', proveme09);
app.use('/prv10', proveme10);
app.use('/prv11', proveme11);
app.use('/prove12', proveme12);
app.use('/', indexMain);
app.use((req, res, next) => {
  // 404 page
  res.render('pages/404', {
    title: '404 - Page Not Found',
    path: req.url
  })
})





const server = http.createServer(app);
const io = require('socket.io')(server)
server.listen(PORT);

io.on('connection', socket => {

  socket.on('disconnect', () => {
    console.log('CLient disconnected');
  });

  socket.on('add', name => {
    socket.broadcast.emit('refresh')
  })

  socket.on('delete', name => {
    socket.broadcast.emit('refresh')
  })

  socket.on('newUser', data => {
    // A new user logs in.
    const message = data.message;
    const newData = {
      message: message,
      type: "message",
      color: data.color
    }
    console.log('user logged')
    socket.broadcast.emit('newMessage', newData) // <-----TODO-----
  })
  socket.on('message', data => {
    // Receive a new message
    data.type = 'message';
    socket.broadcast.emit('newMessage', data);
  })
})