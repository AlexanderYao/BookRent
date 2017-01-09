var BookListCtrl = buildController(function (ctrl) {
    ctrl.name = 'BookListCtrl';
    ctrl.vm = null;
    ctrl.table = null;

    ctrl.init = function () {
        ctrl.vm = new Vue({
            el: '#'+ctrl.ui[0].id,
            data: {
                books:null
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
        ctrl.onRoute = ctrl.vm.query;
    };
});
