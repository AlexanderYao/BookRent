var BaseCtrl = require('./../base/BaseCtrl');

function RentCtrl(containerId, params){
    BaseCtrl.call(this, containerId, params);
    inheritPrototype(RentCtrl, BaseCtrl);
    this.name = 'RentCtrl';

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
module.exports = RentCtrl;
