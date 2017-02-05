var enums = require('./enums');

/**
* Vue filter to convert given value to percent.
*
* @param {String} value     The value string.
* @param {Number} decimals  The number of decimal places.
*/
Vue.filter('percent', function(value, decimals){
    if(!value) value = 0;
    if(!decimals) decimals = 0;

    value = value * 100;
    return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals) + '%';
});

/**
* Vue filter to round the decimal to given place.
*
* @param {String} value     The value string.
* @param {Number} decimals  The number of decimal places.
*/
Vue.filter('round', function(value, decimals){
    if(!value) value = 0;
    if(!decimals) decimals = 0;

    value = Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
    return value;
});

/**
* Vue filter to change enum value into description.
*
* @param {String} value     The enum value.
* @param {String} enumName  The enum name.
*/
Vue.filter('enum', function(value, enumName){
    if(!value) value = 0;
    return enums[enumName][value];
});
