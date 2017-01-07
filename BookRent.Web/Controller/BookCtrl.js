var BookCtrl = buildController(function (ctrl) {
    ctrl.vue = null;
    ctrl.data = null;

    ctrl.init = function () {
    };
    ctrl.onRoute = function(){
        ctrl.data = {
            id:0,
            isbn:fakeIsbn(),
            name:'一只特立独行的猪',
            totalCount:10,
            availableCount:8,
            pinyin:'yztldxdz',
            inDate:'2017-01-07',
            price:13.5,
            buyFrom:0,
            publisher:'中华书局',
            author:'王小波',
            remark:'test'
        };

        ctrl.vue = new Vue({
            el: '#'+ctrl.ui[0].id,
            data: ctrl.data,
            ctrl: ctrl,
            methods:{
                save:function(){
                    console.log('save book:');
                    console.log(ctrl.vue);
                    ctrl.close();
                }
            }
        });
    };
});
