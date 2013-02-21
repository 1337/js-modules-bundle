/*
    localStorage Abstract by github.com/1337
    Provides protection for browsers without localStorage

    MIT Licence
*/
var $ = $ || {};

(function ($, moduleName) {
    "use strict";
    if ($[moduleName]) {  // cool, it's already there
        return;
    }
    var me = function (key, value, defaultValue) {
        /*  what this does depends on the func signature.
            $.localStorage(key)
                returns the value of this key, or null if it does not exist.
            $.localStorage(key, null, defaultValue)
                returns the value of this key, or defaultValue if it does not exist.
            $.localStorage(key, value)
                saves value into the key. returns the value even if it fails.
            $.localStorage(key, value, defaultValue)
                saves value into the key. returns defaultValue even if it fails.

        */
        if (!(key || window.localStorage)) {  // what are you even doing?
            return;
        }
        var ls = window.localStorage;
        if (!value) {  // read mode
            var lsVal = ls.getItem(key);
            if (lsVal === null) {
                return defaultValue || lsVal;
            }
            return lsVal;
        } else {
            ls.setItem(key, value);  // write mode
            return defaultValue || value;
        }
    };
    
    if ($.pubSub) {
        $.pubSub(moduleName, [], me);  // register module
    }
    $[moduleName] = me;  // put it back (optional if you pubSub)
}($, /* [desired namespace] */ 'localStorage'));
