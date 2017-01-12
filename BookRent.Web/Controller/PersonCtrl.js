var BaseCtrl = require('./../base/BaseCtrl');

function PersonCtrl(containerId, params){
    BaseCtrl.call(this, containerId, params);
    inheritPrototype(PersonCtrl, BaseCtrl);
    this.name = 'PersonCtrl';

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
module.exports = PersonCtrl;
