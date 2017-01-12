var BaseCtrl = require('./../base/BaseCtrl');

function MainCtrl(containerId, params){
    BaseCtrl.call(this, containerId, params);
    inheritPrototype(MainCtrl, BaseCtrl);
    this.name = 'MainCtrl';

    this.init = function(){
        var ctrl = this;
        this.vm = new Vue({
            el: '#'+ctrl.containerId,
            data:{

            },
            methods:{
                query:function(){

                }
            }
        });
        this.onRoute = this.vm.query;
    };
}
module.exports = MainCtrl;
