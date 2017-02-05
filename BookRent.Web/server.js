var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var routeBook = require('./server/book');
var routePerson = require('./server/person');

app.use('/assets', express.static('assets'));
app.use('/base', express.static('base'));
app.use('/controller', express.static('controller'));
app.use('/template', express.static('template'));
app.use('/util', express.static('util'));
app.use('/bower_components', express.static('bower_components'));
app.use('/node_modules', express.static('node_modules'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.sendFile(__dirname+'/'+'index.html');
});

routeBook(app);
routePerson(app);

var server = app.listen(8080, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('App listening at http://%s:%s',host,port);
});
