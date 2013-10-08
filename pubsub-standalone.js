/*
    PubSub by github.com/1337
    Provides base publisher-subscriber behaviours to scalable applications

    MIT Licence
*/
var $ = $ || {};

(function ($, moduleName) {
    "use strict";
    if ($[moduleName]) {  // cool, it's already there
        return;
    }
    var hooks = {},  // protected, because screw you
        module = {};

    module = function (name, params, callback) {
        /*  what this does depends on the func signature.
            $.pubSub(name);
                calls all funcs under this name with default params
                returns the value of the last registered function
            $.pubSub(name, params);
                calls all funcs under this name with params
                returns the value of the last registered function
            $.pubSub(name, params, callback);
                registers a new function (callback) w/ default params (params)
                under the name (name)
            $.pubSub.reset();
                removes all callbacks.
            $.pubSub.reset(name);
                removes all callbacks under that name.

        */
        if (!name) {  // what are you even doing?
            return;
        }
        if (params && callback) {  // add new func
            hooks[name] = hooks[name] || [];  // make sure the var is there
            hooks[name].push([callback, params]);  // enqueue everything needed
            module('log', ['added hook ' + name]);
            return;
        }
        
        // correct params to [params] if only one param is passed
        if (!params instanceof Array) {
            params = [params];
        }

        return module.callback(name, params)();
    };

    module.callback = function (name, params) {  // helper
        return function () {
            var funcHooks = hooks[name] || [],
                i = 0,
                lastValue = null;  // shorthand
            for (i = 0; i < funcHooks.length; i += 1) {  // call funcs
                lastValue = funcHooks[i][0].apply(
                    null, params || funcHooks[i][1] || []
                );
            }
            return lastValue;
        };
    };

    module.hooks = function () { return hooks; };  // R/O var. come at me bro!

    module.reset = module.reset || function (name) {
        if (name) {  // remove just a single hook
            hooks[name] = [];
        } else {  // remove everything
            hooks = {};
        }
    };

    $[moduleName] = module;  // put it back
}($, /* [desired namespace] */ 'pubSub'));
