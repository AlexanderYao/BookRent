var _ = require('underscore')
var fake = require('../util/data_generator');
var books = [];

module.exports = function(app){
    app.get('/book/list', function(req, res){
        res.end(JSON.stringify(books));
    });
    app.get('/book/:id', function(req, res){
        var id = req.params.id;
        var book = _.findWhere(books, {id: parseInt(id)});
        res.end(JSON.stringify(book));
    });
    app.post('/book/save', function(req, res){
        var book = req.body;
        if(null == book) return;

        if(null == book.id){
            book.id = books.length;
            books.push(book);
        }else{
            var index = _.findIndex(books, {id: book.id});
            if(-1 != index){
                books[index] = book;
            }
        }
        res.end(book.id.toString());
    });
    app.delete('/book/:id', function(req, res){
        console.log('delete book: id = '+req.params.id);
        var index = _.findIndex(books, {id: parseInt(req.params.id)});
        if(-1 != index){
            books.splice(index, 1);
        }
        res.end(req.params.id);
    });
    initBooks();
};

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
            buyFrom:i%3,
            publisher:'中华书局',
            author:'王小波',
            remark:'test'
        });
    }
}
