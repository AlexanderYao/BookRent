var BaseCtrl = require('./../base/BaseCtrl');

function BookListCtrl(containerId, params){
    BaseCtrl.call(this, containerId, params);
    inheritPrototype(BookListCtrl, BaseCtrl);
    this.name = 'BookListCtrl';

    this.init = function(){
        var ctrl = this;
        this.vm = new Vue({
            el: '#'+ctrl.containerId,
            data:{
                books:[]
            },
            methods:{
                query:function(){
                    var that = this;
                    var promise = $.get('book/list');
                    promise.done(function(data){
                        that.$set(that, 'books', JSON.parse(data));
                        Vue.nextTick(function(){
                            if(null == ctrl.table){
                                ctrl.table = $('#booklist_table').DataTable();
                            }else{
                                ctrl.table.draw();
                            }
                        });
                    });
                },
                edit:function(id){
                    window.location.href = '#book/'+id;
                },
                del:function(id){
                    var that = this;
                    var promise = $.ajax({
                        type:'DELETE',
                        url:'book/'+id
                    });
                    promise.done(function(res){
                        console.log('delete book: id = '+res);
                        UIkit.notify('删除成功!',{status:'info'});
                        that.query();
                    });
                }
            }
        });
        this.onRoute = this.vm.query;
    };
}
module.exports = BookListCtrl;
