var Router = {
    routes: [],
    ele: null,
    add: function (path, ui, controller) {
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
    remove: function (path) {
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
                console.log('route: ' + url + ', ' + item.ui.id + ', ' + params.toString());

                if (!$$(item.ui.id)) {
                    this.ele.addView(item.ui);
                    item.ctrl = new item.controller(item.ui.id, $$(item.ui.id));
                    if(item.ctrl.init) item.ctrl.init();
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
    }
};