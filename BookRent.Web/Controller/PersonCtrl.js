var BaseCtrl = require('./../base/BaseCtrl');
var enums = require('./../util/enums');

function PersonCtrl(containerId, params){
    BaseCtrl.call(this, containerId, params);
    inheritPrototype(PersonCtrl, BaseCtrl);
    this.name = 'PersonCtrl';

    this.init = function(){
        var ctrl = this;
        this.vm = new Vue({
            el: '#'+ctrl.containerId,
            data:{
                action:'',
                person:{},
                Sexes:enums.Sexes
            },
            methods:{
                query:function(){
                    if(ctrl.params.id == 'add'){
                        this.action = '新增';
                        this.$set(this, 'person', {});
                        return;
                    }

                    this.action = '编辑';
                    var that = this;
                    var promise = $.get('person/'+ctrl.params.id);
                    promise.done(function(data){
                        that.$set(that, 'person', JSON.parse(data));
                    });
                },
                save:function(){
                    console.log('save person:');
                    console.log(this.person);
                    var promise = $.ajax({
                        type:'POST',
                        url:'person/save',
                        data:JSON.stringify(this.person),
                        contentType:'application/json'
                    });
                    promise.done(function(res){
                        console.log('save person: id = '+res);
                        UIkit.notify('保存成功!',{status:'info'});
                        ctrl.close();
                    });
                    promise.fail(function(error){
                        console.log(error);
                    });
                },
                cancel:function(){
                    window.history.go(-1);
                    //ctrl.close();
                }
            }
        });
        this.onRoute = this.vm.query;
    };
}
module.exports = PersonCtrl;
