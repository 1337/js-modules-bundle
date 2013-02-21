/*
    log Abstract by github.com/1337
    Provides protection for browsers without the console object

    MIT Licence
*/
var $ = $ || {};

(function ($, moduleName) {
    "use strict";
    if ($[moduleName]) {  // cool, it's already there
        return;
    }
    var me = function (msg, isError) {
        if (!console) {
            return;
        }
        if (isError && console.error) {
            return console.error(msg);
        }
        if (console.log) {
            return console.log(msg);
        }
    };
    
    if ($.pubSub) {
        $.pubSub(moduleName, [], me);  // register module
    }
    $[moduleName] = me;  // put it back (optional if you pubSub)
}($, /* [desired namespace] */ 'log'));
