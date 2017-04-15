var sqlite3 = require('sqlite3').verbose();
var db;

function createDb(){
    db = new sqlite3.Database('test', createTable);
}

function createTable(){
    db.run("create table if not exists Books ("+
    	"ISBN text,"+
    	"Name text,"+
    	"InDate date,"+
    	"Price numeric,"+
    	"Pinyin text,"+
    	"BuyFrom text,"+
    	"Remark text,"+
    	"TotalCount int,"+
    	"AvailableCount int,"+
    	"Publisher text,"+
    	"Author text)");
}

function executeNonQuery(sql, params){
    db.exec(sql);
}

function executeList(sql, callback){
    db.all(sql, callback);
}

function executeScalar(sql){
    db.get(sql);
}

function closeDb(){
    db.close();
}

createDb();
executeNonQuery("insert into Books "+
"(ISBN, Name, InDate, Price, Pinyin, BuyFrom, Remark, TotalCount, AvailableCount, Publisher, Author) values "+
"(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
["1", "test", "2017-4-15", 11, "test", "taobao", "remark", 10, 10, "sb", "sb"]);
executeList("select * from Books", function(err, rows){
    rows.forEach(function(row){
        console.log(row.ISBN+" "+row.Name);
    });
});
