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
