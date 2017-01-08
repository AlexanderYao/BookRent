var express = require('express');
var app = express();
var fs = require('fs');
var fake = require('./util/data_generator');
const BuyFroms = require('./util/enums.js');
// var bodyParser = require('body-parser');
// var urlencodedParser = bodyParser.urlencoded({extended: false});

app.use('/assets', express.static('assets'));
app.use('/base', express.static('base'));
app.use('/controller', express.static('controller'));
app.use('/template', express.static('template'));
app.use('/util', express.static('util'));
app.use('/bower_components', express.static('bower_components'));
app.use('/node_modules', express.static('node_modules'));

app.get('/', function(req, res){
    res.sendFile(__dirname+'/'+'index.html');
});

var books = [];
app.get('/book/list', function(req, res){
    res.end(JSON.stringify(books));
});
app.get('/book/:id', function(req, res){
    res.end(JSON.stringify(books[req.params.id]));
});
app.post('/book/add', function(req, res){
    console.log(req);
    res.end('ok');
});
app.delete('/book/delete/:id', function(req, res){
    console.log(req);
});
function initBooks(){
    console.log('init books');
    for(var i=0;i<50;i++){
        books.push({
            id:i,
            isbn:fake.fakeIsbn(),
            name:'一只特立独行的猪',
            totalCount:10,
            availableCount:8,
            pinyin:'yztldxdz',
            inDate:'2017-01-07',
            price:13.5,
            buyFrom:BuyFroms[i%3],
            publisher:'中华书局',
            author:'王小波',
            remark:'test'
        });
    }
}


var server = app.listen(8080, function(){
    initBooks();
    var host = server.address().address;
    var port = server.address().port;
    console.log('App listening at http://%s:%s',host,port);
});
