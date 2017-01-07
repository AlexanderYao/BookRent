var BaseController = function(ui, buildFunc){

    this.app = null;
    this.params = null;
    this.name = 'BaseController';
    this.ui = ui;

    this.validationFunction = {

        emptyFunc: function(fieldName, fieldValue, product){
            return true;
        },

        defaultFunc: function(fieldName, fieldValue, product){
            return (fieldValue != null && fieldValue !== '');
        },

        numericFunc: function(fieldName, fieldValue, product){
            return (fieldValue != null && parseFloat(fieldValue) != NaN);
        },

        percentageFunc: function(fieldName, fieldValue, product){
            var pattern = new RegExp(/(^\d+(\.\d+)?\%{1})(\s*(\/|,|;|\|)\s*\d+(\.\d+)?\%{1})*$/);
            return (fieldValue != null && pattern.test(fieldValue));
        }

    };

    this.validate = function(validationRule, product, field){
        var flag = true;
        _.each(validationRule, function(value, key){
            if(field == null || field === key){
                var fieldName = key;
                var fieldValue = product[fieldName];
                validationRule[key].hasError = !(value.validationFunc(fieldName, fieldValue, product));
                if(value.hasError == true){
                    flag = false;
                }
            }
        });
        return [flag, validationRule];
    };

    this.close = function(){
        this.app.removeController(this);
    };

    buildFunc(this);
};


function buildController(buildFunc){

    var func = function(ui){
        BaseController.call(this, ui, buildFunc);
    };

    func.prototype = Object.create(BaseController.prototype);
    func.prototype.constructor = func;
    return func;

};
