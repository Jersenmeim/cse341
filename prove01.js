var express = require('express');
var app = express();
const routes = require('./prove01-routes');
app.get('/', routes.handler);
app.post('/create-user', routes.handler);
app.get('/users', routes.handler);

app.listen(3000);