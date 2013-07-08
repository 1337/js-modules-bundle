/*
    Curry by github.com/1337

    MIT Licence
*/
var $ = $ || {};

(function ($, moduleName) {
    "use strict";
    var me = {};

    if ($[moduleName]) {  // cool, it's already there
        return;
    }

    me = function (func, param) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            args.unshift(param);
            return func.apply(undefined, args);
        };
    };

    if ($.pubSub) {
        $.pubSub(moduleName, [], me);  // register module
    }
    $[moduleName] = me;  // put it back (optional if you pubSub)
}($, /* [desired namespace] */ 'curry'));
