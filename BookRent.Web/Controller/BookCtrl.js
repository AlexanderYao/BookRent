var BookCtrl = buildController(function (ctrl) {
    ctrl.name = 'BookCtrl';
    ctrl.vm = null;
    ctrl.data = null;

    ctrl.init = function () {
    };
    ctrl.onRoute = function(){
        var id = ctrl.params.id;
        $.get('book/'+id,function(data){
            if(null == ctrl.vm){
                ctrl.vm = new Vue({
                    el: '#'+ctrl.ui[0].id,
                    data: {book:JSON.parse(data)},
                    methods:{
                        save:function(){
                            console.log('save book:');

                            ctrl.close();
                        }
                    }
                });
            }else{
                ctrl.vm.$set(ctrl.vm, 'book', JSON.parse(data));
            }
        });
    };
});
