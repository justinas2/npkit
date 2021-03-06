var objMerger = function(needFilter, args){
    var isHold = 0, 
        resultObject, 
        currentObject,
        paramsMap;
    if(args[args.length - 1] === true){
        isHold = 1;
    }
    resultObject = isHold ? args[0] : {};
    for(var i = isHold, j = args.length - isHold; i < j; i++) {
        currentObject = args[i];
        if(typeof currentObject === 'object'){
            paramsMap = needFilter ? args[0] : currentObject;
            for(var key in paramsMap){
                if(currentObject.hasOwnProperty(key)){
                    resultObject[key] = currentObject[key];
                }
            }
        }
    }
    return resultObject;
};
module.exports = {
    get : function(data, ns){
        if(!ns){return data;}
        ns = ns.replace(/[\[|\]]/g, '.').replace(/(?:(?:^\.*)|\.{2,}|(?:\.*$))/g, '');
        var nsArr = ns.split('.'), key;
        while(nsArr.length){
            key = nsArr.shift();
            if(!data || typeof data !== 'object'){
                return undefined;
            }
            data = data[key];
        }
        return data;
    },
    set : function(data, ns, value){
        var nsArr = ns.split('.'), 
            key;
        while(nsArr.length > 1){
            key = nsArr.shift();
            if(!data[key] || typeof data[key] !== 'object'){
                data[key] = {};
            }
            data = data[key];
        }
        data[nsArr.pop()] = value;
    },
    merge : function(){
        return objMerger(false, arguments);
    },
    parse : function(){
        return objMerger(true, arguments);
    },
    map : function(obj, func){
        if(typeof obj !== 'object'){return;}
        var rs = [];
        for(var key in obj){
            if(obj.hasOwnProperty(key)){
                rs.push(func ? func.call(obj, obj[key], key, obj) : obj[key]);
            }
        }
        return rs;
    },
    each : function(obj, func){
        if(obj.hasOwnProperty('length')){
            return Array.prototype.forEach.call(obj, func);
        }
        for(var key in obj){
            if(obj.hasOwnProperty(key)){
                func.call(obj, obj[key], key, obj);
            }
        }
    },
    objectType : function(obj){
        return Object.prototype.toString.call(obj).slice(8, -1);
    },
    isEmptyObject : function(obj){
        for(var key in obj){
            if(obj.hasOwnProperty(key)){
                return false;
            }
        }
        return true;
    },
    isSimpleObject : function(obj){
        return typeof obj === 'object' && $.objectType(obj) === 'Object';
    },
    _check : function(name, arg){
        return typeof arg[0] === 'object';
    }
}
var $ = require('../');
