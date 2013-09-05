/*
    Functools by github.com/1337

    MIT Licence
*/
var $ = $ || {};

(function ($, moduleName) {
    "use strict";
    var me = {};

    if ($[moduleName]) {  // cool, it's already there
        return;
    }

    me.curry = function (func, param) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            args.unshift(param);
            return func.apply(undefined, args);
        };
    };
    
    me.partial = function (func, paramMap) {
        /*
            $.functools.partial(function (hello, world) {
                return [hello, world];    
            }, {'world': 4, 'hello': 5})()
            > [5, 4]
        */
        var params = func.toString()
                         .match(/function\s*.*\((.*)\)/)[1]
                         .split(',')
                         .map(function (v) {
                             return paramMap[v.trim()];
                          });
        return me.curry(func, params);
    };

    if ($.pubSub) {
        $.pubSub(moduleName, [], me);  // register module
    }
    $[moduleName] = me;  // put it back (optional if you pubSub)
}($, /* [desired namespace] */ 'functools'));
