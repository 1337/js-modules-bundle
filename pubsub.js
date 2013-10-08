/**
 * commonjsStrictGlobal mod (extra checks)
 */
(function (context, factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'jquery'], function (exports, jQuery) {
            factory((context.pubSub = exports), jQuery);
        });
    } else if (typeof exports === 'object' && typeof require === 'function') {
        // CommonJS
        factory(exports, require('jQuery'));
    } else {
        // Browser globals
        factory((context.pubSub = {}), context.jQuery);
    }
}(this, function (exports, jQuery) {
    "use strict";

    var $ = jQuery,  // this doesn't actually use jQuery.
        hooks = {},  // protected, because screw you
        module;

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
                    null,
                    params || funcHooks[i][1] || []
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

    // attach properties to the exports object to define the exported module properties.
    exports = module;
}));