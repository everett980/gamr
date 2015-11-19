var express = require('express');
var bodyParser = require('body-parser');
var chalk = require('chalk');
var swig = require('swig');
var path = require('path');

var routes = require('./routes/');

var app = express();
var port = 3000;

// Default settings for template engine
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view cache', false);
swig.setDefaults({ cache : false});

// point res.render to the proper directory
app.set('views', __dirname + '/views');
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files
// have it use swig to do so
app.engine('html', swig.renderFile);
// turn of swig's caching
swig.setDefaults({cache: false});



app.listen(port);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function(req, res, next) {
	console.log(req.method + " " + req.path);
	next();
})

app.use('/', routes);