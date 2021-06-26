const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const products = require('./routes.js');

// app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.json());

// Set up our routes
app.use('/', products);

module.exports = app;
