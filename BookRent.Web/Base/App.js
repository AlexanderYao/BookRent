var Router = require('./router');
var NewBookCtrl = require('./../Controller/BookCtrl');

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
        //var Controller = require('./../'+item.buildCtrl);
        var ctrl = new NewBookCtrl(item.containerId, params);
        item.ctrl = ctrl;

        // var ctrl = new item.buildCtrl($('#'+item.containerId));
        // ctrl.app = App;
        // ctrl.params = params;
        // item.ctrl = ctrl;

        //init view: load template || init by webix || init by controller itself
        if(typeof item.ui === 'string'){
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
        }else if(boolean(webix) && typeof item.ui === 'object'){
            webix.ui(item.ui, item.containerId);
            if(ctrl.init) ctrl.init();
        }else{
            console.log('App.route: can not init view');
            if(ctrl.init) ctrl.init();
        }
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
