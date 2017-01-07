var BookListCtrl = buildController(function (ctrl) {
    ctrl.vue = null;
    ctrl.data = null;

    ctrl.init = function () {
    };
    ctrl.onRoute = function(){
        ctrl.data = ctrl.query();

        ctrl.vue = new Vue({
            el: '#'+ctrl.ui[0].id,
            data: ctrl.data,
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
    };
    ctrl.query = function(){
        var items = [];
        for(var i=0;i<50;i++){
            items.push({
                id:i,
                isbn:fakeIsbn(),
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

        var data = {
            books: items
        };
        return data;
    };
});
