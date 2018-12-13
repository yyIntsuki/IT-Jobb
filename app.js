var express = require('express');
var bodyParser = require('body-parser');

var Home = require('./routes/home')

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', Home);

app.use(express.static('public'));

var PORT = process.env.PORT || 4242;

app.listen(PORT, function(){
    console.log('Server up and running on port ' + PORT + '.');
});