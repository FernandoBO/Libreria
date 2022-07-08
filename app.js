var express = require('express');
var app = express();
var usersRouter = require('./routes/usuariosRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', usersRouter);

module.exports = app;