var BaseCtrl = require('./../base/BaseCtrl');

function PersonListCtrl(containerId, params){
    BaseCtrl.call(this, containerId, params);
    inheritPrototype(PersonListCtrl, BaseCtrl);
    this.name = 'PersonListCtrl';

    this.init = function(){
        var ctrl = this;
        this.vm = new Vue({
            el: '#'+ctrl.containerId,
            data:{
                persons:[]
            },
            methods:{
                query:function(){
                    var that = this;
                    var promise = $.get('person/list');
                    promise.done(function(data){
                        that.$set(that, 'persons', JSON.parse(data));
                        Vue.nextTick(function(){
                            if(null == ctrl.table){
                                ctrl.table = $('#personlist_table').DataTable();
                            }else{
                                ctrl.table.draw();
                            }
                        });
                    });
                },
                edit:function(id){
                    window.location.href = '#person/'+id;
                },
                del:function(id){
                    var that = this;
                    var promise = $.ajax({
                        type:'DELETE',
                        url:'person/'+id
                    });
                    promise.done(function(res){
                        console.log('delete person: id = '+res);
                        UIkit.notify('删除成功!',{status:'info'});
                        that.query();
                    });
                }
            }
        });
        this.onRoute = this.vm.query;
    };
}
module.exports = PersonListCtrl;
