var App = {

    eventBuses: {},

    rootCtrl: null,

    controllers: {},

    cache: {},

    routes: [],

    ele: null,

    addRoute: function (path, ui, controller) {
        var paramNames = [];
        //可扩展对 '?param1=1&param2=2' 的识别
        var regex = path.replace(/([:*])(\w+)/g, function (full, dots, name) {
            paramNames.push(name);
            return '([^\/]+)';
        }) + '(?:\/|$)';

        this.routes.push({
            path: path,
            ui: ui,
            controller: controller,
            regex: new RegExp(regex),
            paramNames: paramNames
        });
        return this;
    },

    removeRoute: function (path) {
        if (this.routes[path]) delete this.routes[path];
        return this;
    },

    route: function () {
        this.ele = this.ele || $$('view');
        if (!this.ele) return;

        var url = location.hash.slice(1) || '/';
        var isFind = false;
        for (var i = 0; i < this.routes.length; i++) {
            var item = this.routes[i];
            var match = url.match(item.regex);
            if (match) {
                var params = match.slice(1, match.length)
                    .reduce(function (params, value, index) {
                        if (params === null) {
                            params = {};
                        }
                        params[item.paramNames[index]] = value;
                        return params;
                    }, null);

                isFind = true;
                console.log('route: ' + url + ', ' + item.ui.id + ', ' + (params ? params.toString() : ""));

                if (!$$(item.ui.id)) {
                    this.ele.addView(item.ui);
                    item.ctrl = new item.controller(item.ui.id, $$(item.ui.id));
                    this.addController(item.ctrl);
                    if (item.ctrl.init) item.ctrl.init();
                }
                $$(item.ui.id).show(true);

                break;
            }
        }

        if (!isFind) {
            console.log('find no route');
        }
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


    setRootController: function(rootCtrl){
        App.rootCtrl = rootCtrl;
    },

    addController: function(ctrl){
        ctrl.app = App;
        App.controllers[ctrl.name] = ctrl;
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
                if(eventBus == "webSocket") {
                    App.notify({
                        type: 'error',
                        text: "服务器连接错误，正在尝试重连。如果问题持续，请按F5刷新页面。如果还有问题，请联系系统管理员。"
                    });
                    App.connect2WebSocket();
                }
            }
        }

    },

    publishEvent: function(eventBus, address, message, headers){

        if(App.eventBuses[eventBus] != null){
            try {
                App.eventBuses[eventBus].publish(address, message, headers);
            }catch(error){
                if(eventBus == "webSocket") {
                    App.notify({
                        type: 'error',
                        text: "服务器连接错误，正在尝试重连。如果问题持续，请按F5刷新页面。如果还有问题，请联系系统管理员。"
                    });
                    App.connect2WebSocket();
                }
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

            if(message["type"] == "error"){
                toastr.error(message["text"]);
            }else if(message["type"] == "success"){
                toastr.success(message["text"]);
            }else{
                toastr.success(message["text"]);
            }


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
            if (App.controllers[ctrl] != null && App.controllers[ctrl][method] != null) {
                App.controllers[ctrl][method].apply(null, [args, id, e, node]);
            }
        }
    },

    connect2WebSocket: function(){
        //connect to web socket
        console.log("init websocket eventbus");
        App.eventBuses['webSocket'] = new WebSocketEventBus('/eventbus')

        //App.eventBuses['webSocket'] = new LocalEventBus("webSocket", mockProcessors);

        App.eventBuses['webSocket'].onopen = function(){
            console.log("websocket opened");

            App.notify({
                text: "正在尝试连接后台",
                type: "success"
            });
            _.each(App.controllers, function(ctrl){

                _.each(ctrl.handlers(), function(handler){

                    if(handler.channel == "webSocket") {
                        console.log("register handler " + JSON.stringify(handler) + " for channel webSocket" );
                        App.eventBuses['webSocket'].registerHandler(handler.address, {}, handler.method);
                    }

                });

            });

            App.publishEvent("local", "websocket.connected", {}, {});

        };
    },

    init: function() {

        //connect to local event bus
        console.log("init local eventbus");
        App.eventBuses['local'] = new LocalEventBus("local");

        App.eventBuses['local'].onopen = function () {
            console.log("local event bus opened");


            //register controller events handler
            //consider difference between local event and web socket event
            _.each(App.controllers, function (ctrl) {

                _.each(ctrl.handlers(), function (handler) {

                    if (handler.channel == "local") {
                        console.log("register handler " + JSON.stringify(handler) + " for channel local");
                        App.eventBuses['local'].registerHandler(handler.address, {}, handler.method);
                    }

                });

            });

            //init ctrls
            _.each(App.controllers, function (ctrl) {
                ctrl.init();
            });

        };
        App.eventBuses['local'].open();

        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-bottom-right",
            "preventDuplicates": true,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "500",
            "timeOut": "3000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };

        $(window).focus(function () {
            App.messageConfig.notificationByHtml5 = false;
        });

        $(window).blur(function () {
            App.messageConfig.notificationByHtml5 = true;
        });

        this.listen();
    }


};