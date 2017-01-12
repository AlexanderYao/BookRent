function BaseCtrl(containerId, params){
    this.app = App;
    this.containerId = containerId;
    this.params = params;
    this.name = 'BaseCtrl';
    this.vm = null;

    this.init = function(){
        console.log('BaseCtrl.init()');
    };
    this.onRoute = function(){
        console.log('BaseCtrl.onRoute()');
    };
    this.close = function(){
        this.app.removeController(this);
    };
}
module.exports = BaseCtrl;
