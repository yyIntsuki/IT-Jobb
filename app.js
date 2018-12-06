var express = require('express');
var bodyParser = require('body-parser');
var sitePath = process.argv[2] || ".";

var indexRouter = require('./routes/index');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

app.use(express.static(__dirname + '/' + sitePath));
var PORT = process.env.PORT || 4242;

app.listen(PORT, function(){
    console.log('Server up and running on port ' + PORT + '.');
});