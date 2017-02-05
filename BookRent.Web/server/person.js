var _ = require('underscore')
var fake = require('../util/data_generator');
var persons = [];

module.exports = function(app){
    app.get('/person/list', function(req, res){
        res.end(JSON.stringify(persons));
    });
    app.get('/person/:id', function(req, res){
        var id = req.params.id;
        var person = _.findWhere(persons, {id: parseInt(id)});
        res.end(JSON.stringify(person));
    });
    app.post('/person/save', function(req, res){
        var person = req.body;
        if(null == person) return;

        if(null == person.id){
            person.id = persons.length;
            persons.push(person);
        }else{
            var index = _.findIndex(persons, {id: person.id});
            if(-1 != index){
                persons[index] = person;
            }
        }
        res.end(person.id.toString());
    });
    app.delete('/person/:id', function(req, res){
        console.log('delete person: id = '+req.params.id);
        var index = _.findIndex(persons, {id: parseInt(req.params.id)});
        if(-1 != index){
            persons.splice(index, 1);
        }
        res.end(req.params.id);
    });
    initPersons();
};

function initPersons(){
    console.log('init persons');
    for(var i=0;i<10;i++){
        persons.push({
            id:i,
            name:'alex',
            pinyin:'alex',
            sex:i%2,
            startDate:'2017-01-07',
            endDate:'2017-02-07',
            fee:100,
            deposit:200,
            phoneNo:'13700001111',
            contacter:'xiong',
            remark:'test'
        });
    }
}
