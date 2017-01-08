var BookListCtrl = buildController(function (ctrl) {
    ctrl.name = 'BookListCtrl';
    ctrl.vue = null;
    ctrl.data = null;

    ctrl.init = function () {
    };
    ctrl.onRoute = function(){
        //ctrl.data = ctrl.query();

        $.get('book/list',function(data){
            var books = {
                books: JSON.parse(data)
            };
            ctrl.vue = new Vue({
                el: '#'+ctrl.ui[0].id,
                data: books,
                methods:{
                    edit:function(id){
                        console.log('edit '+id);
                        window.location.href = '#book/'+id;
                    },
                    del:function(id){
                        console.log('del '+id);
                        delete ctrl.vue[id];
                    }
                }
            });
            $('#booklist_table').DataTable();
        });
    };
    ctrl.query = function(){
        var items = [];

        var data = {
            books: items
        };
        return data;
    };
});
