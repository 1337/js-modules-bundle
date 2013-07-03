/*
    Legalize by github.com/1337
    Provides classical behaviours for JavaScript prototypes

    MIT Licence
*/
var $ = $ || {};

(function ($, moduleName) {
    "use strict";
    if ($[moduleName]) {  // cool, it's already there
        return;
    }
    var me = function (class, funcMap) {
        /*  assigns a map of { 'name': function }s to
            <uninstantiated> class
        */
        for (key in funcMap) {
            if (funcMap.hasOwnProperty(key) {
                class.prototype[key] = funcMap.key;
            }
        }
    };

    me.subclass = function () {
        return me.prototype;
    }

    if ($.pubSub) {
        $.pubSub(moduleName, [], me);  // register module
    }
    $[moduleName] = me;  // put it back (optional if you pubSub)
}($, /* [desired namespace] */ 'legalize'));
