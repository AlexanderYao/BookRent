(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var BaseCtrl = require('./../base/BaseCtrl');
var enums = require('./../util/enums');

function BookCtrl(containerId, params){
    BaseCtrl.call(this, containerId, params);
    inheritPrototype(BookCtrl, BaseCtrl);
    this.name = 'BookCtrl';

    this.init = function () {
        var ctrl = this;
        this.vm = new Vue({
            el: '#'+ctrl.containerId,
            data: {
                action:'',
                book:{},
                BuyFroms:enums.BuyFroms
            },
            methods:{
                query:function(){
                    if(ctrl.params.id == 'add'){
                        this.action = '新增';
                        this.$set(this, 'book', {});
                        return;
                    }

                    this.action = '编辑';
                    var that = this;
                    var promise = $.get('book/'+ctrl.params.id);
                    promise.done(function(data){
                        that.$set(that, 'book', JSON.parse(data));
                    });
                },
                save:function(){
                    console.log('save book:');
                    console.log(this.book);
                    var promise = $.ajax({
                        type:'POST',
                        url:'book/save',
                        data:JSON.stringify(this.book),
                        contentType:'application/json'
                    });
                    promise.done(function(res){
                        console.log('save book: id = '+res);
                        UIkit.notify('保存成功!',{status:'info'});
                        ctrl.close();
                    });
                    promise.fail(function(error){
                        console.log(error);
                    });
                },
                cancel:function(){
                    window.history.go(-1);
                    //ctrl.close();
                }
            }
        });
        this.onRoute = this.vm.query;
    }
}
module.exports = BookCtrl;

},{"./../base/BaseCtrl":8,"./../util/enums":10}],2:[function(require,module,exports){
var BaseCtrl = require('./../base/BaseCtrl');

function BookListCtrl(containerId, params){
    BaseCtrl.call(this, containerId, params);
    inheritPrototype(BookListCtrl, BaseCtrl);
    this.name = 'BookListCtrl';

    this.init = function(){
        var ctrl = this;
        this.vm = new Vue({
            el: '#'+ctrl.containerId,
            data:{
                books:[]
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
        this.onRoute = this.vm.query;
    };
}
module.exports = BookListCtrl;

},{"./../base/BaseCtrl":8}],3:[function(require,module,exports){
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

},{"./../base/BaseCtrl":8}],4:[function(require,module,exports){
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

},{"./../base/BaseCtrl":8}],5:[function(require,module,exports){
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
                persons:[]
            },
            methods:{
                query:function(){
                    var that = this;
                    var promise = $.get('person/list');
                    promise.done(function(data){
                        that.$set(that, 'persons', JSON.parse(data));
                        Vue.nextTick(function(){
                            if(null == ctrl.table){
                                ctrl.table = $('#personlist_table').DataTable();
                            }else{
                                ctrl.table.draw();
                            }
                        });
                    });
                },
                edit:function(id){
                    window.location.href = '#person/'+id;
                },
                del:function(id){
                    var that = this;
                    var promise = $.ajax({
                        type:'DELETE',
                        url:'person/'+id
                    });
                    promise.done(function(res){
                        console.log('delete person: id = '+res);
                        UIkit.notify('删除成功!',{status:'info'});
                        that.query();
                    });
                }
            }
        });
        this.onRoute = this.vm.query;
    };
}
module.exports = PersonListCtrl;

},{"./../base/BaseCtrl":8}],6:[function(require,module,exports){
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

},{"./../base/BaseCtrl":8}],7:[function(require,module,exports){
var Router = require('./router');
var BaseCtrl = require('./BaseCtrl');
var BookCtrl = require('./../Controller/BookCtrl');
var BookListCtrl = require('./../Controller/BookListCtrl');
var MainCtrl = require('./../Controller/MainCtrl');
var PersonCtrl = require('./../Controller/PersonCtrl');
var PersonListCtrl = require('./../Controller/PersonListCtrl');
var RentCtrl = require('./../Controller/RentCtrl');

window.App = {

    eventBuses: {},
    rootCtrl: null,
    cache: {},

    routes: {},
    router: new Router(),
    ele: null,
    index: 0,
    prefix: 'container-',

    addRoute: function (path, ui, buildCtrl) {
        this.router.addRoute(path);
        this.routes[path] = {
            path: path,
            ui: ui,
            buildCtrl: buildCtrl,

            ctrl: null,
            containerId: null
        };
        return this;
    },

    removeRoute: function (path) {
        this.router.delRoute(path);
    },

    route: function () {
        this.ele = this.ele || $('#page_content_inner');
        if (!this.ele) return;

        var url = location.hash.slice(1) || '/';
        var result = this.router.check(url);
        if(null == result){
            console.log('App.route: find no route -> 404');
            this._404(url);
            return;
        }

        var item = this.routes[result.path];
        var params = result.params;
        console.log('route: ' + url + ', ' + item.ui);
        console.log(params);
        if(!item.containerId){
            this.build(item, params);
        }else{
            item.ctrl.params = params;
        }
        this.show(item.containerId);
        setTimeout(function(){
            if(!item.ctrl.onRoute) return;

            try {
                item.ctrl.onRoute();
            } catch (error) {
                console.log('ctrl onRoute error: ' + error);
            }
        }, 400);
    },

    _404: function(url){
        var id = this.prefix+'404';
        if(!$('#'+id).length){
            this.ele.append('<div class="uk-grid uk-grid-width-1-1" '+
                'id="'+id+'">'+
            '</div>');
            $('#'+id).load('template/404.html', function(){
                $('#404_url').text(url);
            });
        }
        this.show(id);
        $('#404_url').text(url);
    },

    //build item
    build: function(item, params){
        //create container div
        item.containerId = this.prefix+this.index;
        this.index++;
        this.ele.append('<div class="uk-grid uk-grid-width-1-1" '+
            'id="'+item.containerId+'">'+
        '</div>');

        //build controller, call init() if exists
        var Controller = require(item.buildCtrl);
        var ctrl = new Controller(item.containerId, params);
        item.ctrl = ctrl;

        $('#'+item.containerId).load(item.ui, function(){
            var $this = $(this);
            altair_forms.select_elements($this);
            altair_md.checkbox_radio($this);
            altair_md.inputs($this);

            setTimeout(function(){
                if(!ctrl.init) return;

                try {
                    ctrl.init();
                } catch (error) {
                    console.log('ctrl init error: ' + error);
                }
            }, 200);
        });
    },

    //hide all children, show div with animation
    show: function(id){
        this.ele.children().hide();

        $('#'+id).show()
        .velocity({
            //translateX: ['0%', '100%'],
            opacity: [1, 0],
            //scale: [1, 0]
        },{
            duration: 400,
            easing: easing_swiftOut
        });
    },

    listen: function () {
        window.addEventListener('load', this.route.bind(this));
        window.addEventListener('hashchange', this.route.bind(this));
        //var self = this;
        //window.addEventListener('hashchange', function (event) {
        //    self.route(event);
        //});
    },

    messageConfig: {
        messageFlushInterval: 2,
        maxBufferSize: 10,
        showNotification: true,
        notificationByHtml5: false
    },

    messages: [],

    removeController: function(ctrl){
        ctrl.app = null;
        var route = App.getRouteByCtrlName(ctrl.name);
        if(!route) return;

        route.ctrl = null;
        $('#'+route.containerId).velocity(
            {
                translateX: ['-100%', '0%'],
                scale: [0, 1]
            },
            {
                duration: 400,
                easing: easing_swiftOut,
                complete: function(elements){
                    if(elements.length == 0) return;
                    elements[0].remove();
                }
            }
        );
        route.containerId = null;

        history.back();
    },

    turnOffNotification : function(){
        App.messageConfig.showNotification = false;
    },

    turnOnNotification : function(){
        App.messageConfig.showNotification = true;
    },

    sendEvent: function(eventBus, address, message, headers, callback){

        if(App.eventBuses[eventBus] != null){
            try {
                App.eventBuses[eventBus].send(address, message, headers, callback);
            }catch(error){
                App.notify({
                    type: 'error',
                    text: error
                });
            }
        }

    },

    publishEvent: function(eventBus, address, message, headers){

        if(App.eventBuses[eventBus] != null){
            try {
                App.eventBuses[eventBus].publish(address, message, headers);
            }catch(error){
                App.notify({
                    type: 'error',
                    text: error
                });
            }
        }

    },

    notify: function(message){

        if(App.messageConfig.showNotification){

            if(App.messageConfig.notificationByHtml5){
                if(App.notifyByHtml5(message)){
                    return;
                }
            }

            //use uikit notify
            // if(message["type"] == "error"){
            //     toastr.error(message["text"]);
            // }else if(message["type"] == "success"){
            //     toastr.success(message["text"]);
            // }else{
            //     toastr.success(message["text"]);
            // }

        }

    },

    notifyByHtml5: function(message){

        if(!("Notification" in window)){
            return false;
        }
        else if(Notification.permission === "granted"){

        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {
                if (permission === "granted") {
                }else{
                    return false;
                }
            });
        }

        if(message["type"] == "error"){
            new Notification("通知",{
                body: message['text']
            });
        }else if(message["type"] == "success"){
            new Notification("通知",{
                body: message['text']
            });
        }else{
            new Notification("通知",{
                body: message['text']
            });
        }


        return true;

    },

    controllerFunc: function(ctrl, method, args){
        return function(id, e, node) {
            var controller = App.getControllerByName(ctrl);
            if (controller != null && controller[method] != null) {
                controller[method].apply(null, [args, id, e, node]);
            }
        }
    },

    getRouteByCtrlName: function(ctrlName){
        for(var key in this.routes){
            if(this.routes[key].ctrl && this.routes[key].ctrl.name == ctrlName){
                return this.routes[key];
            }
        }
        return null;
    },

    getControllerByName: function(ctrlName){
        for(var key in this.routes){
            if(this.routes[key].ctrl && this.routes[key].ctrl.name == ctrlName){
                return this.routes[key].ctrl;
            }
        }
        return null;
    },

    getControllers: function(){
        var ctrls = [];
        for(var key in this.routes){
            if(this.routes[key].ctrl){
                ctrls.push(this.routes[key].ctrl);
            }
        }
        return ctrls;
    },

    init: function() {

        //connect to local event bus
        console.log("init local eventbus");
        App.eventBuses['local'] = new LocalEventBus("local");

        App.eventBuses['local'].onopen = function () {
            console.log("local event bus opened");


            //register controller events handler
            //consider difference between local event and web socket event
            _.each(App.getControllers(), function (ctrl) {

                _.each(ctrl.handlers(), function (handler) {

                    if (handler.channel == "local") {
                        console.log("register handler " + JSON.stringify(handler) + " for channel local");
                        App.eventBuses['local'].registerHandler(handler.address, {}, handler.method);
                    }

                });
            });
        };
        App.eventBuses['local'].open();

        $(window).focus(function () {
            App.messageConfig.notificationByHtml5 = false;
        });

        $(window).blur(function () {
            App.messageConfig.notificationByHtml5 = true;
        });

        this.listen();
    },
};

},{"./../Controller/BookCtrl":1,"./../Controller/BookListCtrl":2,"./../Controller/MainCtrl":3,"./../Controller/PersonCtrl":4,"./../Controller/PersonListCtrl":5,"./../Controller/RentCtrl":6,"./BaseCtrl":8,"./router":9}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
function Router () {
    this.routes = {};

    this.addRoute = function(path){
        //do nothing if duplicate
        if(this.routes[path]) return this;

        var paramNames = [];
        var regex = path.replace(/([:*])(\w+)/g, function (full, dots, name) {
            paramNames.push(name);
            return '(\\w+)';
        }) + '(?:\\?|$)';

        this.routes[path] = {
            path: path,
            regex: new RegExp(regex),
            paramNames: paramNames
        };
        return this;
    };

    this.delRoute = function(path){
        if (this.routes[path]) delete this.routes[path];
        return this;
    };

    //return {path, params} if matched, else return null
    this.check = function(url){
        for(var key in this.routes){
            var item = this.routes[key];
            var match = url.match(item.regex);
            if (!match) continue;

            var params = match.slice(1, match.length)
                .reduce(function (params, value, index) {
                    params[item.paramNames[index]] = value;
                    return params;
                }, {});

            var index = url.lastIndexOf('?');
            if(-1 != index){
                var userParams = url.substr(index+1);
                var regex = new RegExp(/(\w+)=(\w+)/g);
                var list;
                while((list = regex.exec(userParams)) != null){
                    params[list[1]] = list[2];
                }
            }

            return {'path': item.path, 'params': params};
        }
        return null;
    };
}
module.exports = Router;

},{}],10:[function(require,module,exports){
module.exports.BuyFroms = {
    0:'淘宝',
    1:'当当',
    2:'捐赠'
};
module.exports.Sexes = {
    0:'男',
    1:'女'
};

},{}]},{},[7]);
