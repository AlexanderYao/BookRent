exports.fakeIsbn = function(){
    var result = '';
    for(var i=0;i<13;i++){
        result += getRandomInt(0,10);
    }
    return result;
}

function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
