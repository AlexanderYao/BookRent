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

            },
            methods:{
                query:function(){

                }
            }
        });
        this.onRoute = this.vm.query;
    };
}
module.exports = PersonListCtrl;
