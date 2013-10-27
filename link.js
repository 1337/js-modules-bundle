var Link = (function ($) {
    "use strict";

    var me = function () {  // var-args
        "use strict";  // load stuff into this Link instance
        var args = arguments;

        switch (args.length) {
        case 0:  // ...?
            break;
        case 1:  // assume {m, v, c}
            return new me(args[0].model, args[0].view, args[0].controller);
            break;
        case 2:
            break;
        case 3:
            var modelObj = args[0], $viewSelector = args[1], controller = args[2];
            this._attrs = $(modelObj || {});
            this._view = me._jQuery($viewSelector);
            this._controller = controller;

            this.rebind();
            break;
        default:
            throw me._errors.ArgCount;
        }
    };

    me.wrap = function (obj) {
        // returns an object wrapped in Link().
        return new me({
            'model': obj,
            'view': $('<div />'),
            'controller': { }
        });
    };

    me.prototype.model = function () {  // var-args
        /*
          model():  return the model object
          model({ key: value, ... }):  sets those values
          model(key):  returns the value for that key
          model(key, value):  sets key to value
         */
        var args = arguments;
        this._attrs = this._attrs || {};  // default

        if (!this._attrs.jquery) {
            this._attrs = $(this._attrs);  // attrs must be a jquery kv store
        }

        switch (args.length) {
        case 0:  // return all attrs
            return this._attrs;
        case 1:
            switch (typeof args[0]) {
            case 'object':  // merge this dict into current dict.
                for (var i in args[0]) {
                    if (args[0].hasOwnProperty(i)) {
                        this._setProp(i, args[0][i]);
                    }
                }
                return this._attrs;
            case 'string':  // return single value.
            default:
                return this._attrs.prop([args[0]]);
            }
        case 2:  // set K = V.
            this._setProp(args[0], args[1]);
            return this;
        default:
            throw me._errors.ArgCount;
        }
    };

    me.prototype.view = function () {  // var-args
        /*
          view():  return the view object
          view('#selector'):  the view becomes this
          view($('#selector')):  the view becomes this
         */
        var args = arguments;
        switch (args.length) {
        case 0:  // return the view
            return this._view;
        case 1:  // set the view
            this._view = me._jQuery(args[0]);
            this.rebind();  // new view has identical events
            return this;
        default:
            throw me._errors.ArgCount;
        }
    };

    me.prototype.on = function () {  // var-args
        /*
          on(): return the controller object
          on({ event: function, ... }):  bind these functions to the view
          on('eventName'):  return the function associated with the event
          on('event', function):  bind this function to the view
         */
        var args = arguments;
        switch (args.length) {
        case 0:  // return the controller
            return this._controller;
        case 1:  // set the controller
            switch (typeof args[0]) {
            case 'object':
                if ($.isPlainObject(args[0])) {  // event-func pairs
                    this._controller = args[0];
                } else if ($.isArray(args[0])) {  // list of event-func KVs
                    throw me._errors.NotImplemented;
                } else {  // then what is it?
                    throw me._errors.MalformedObject;
                }
                return this._controller;
            case 'string':  // whatever this is, return it
                return this._controller[args[0]];
            }
            this._view.on(this._controller);
            return this._controller;
        case 2:  // assumed (string), (function)
            this._view.off(this._controller);  // unregister current ones
            this._controller[args[0]] = args[1];  // SUBSTITUTES old event
            this._view.on(this._controller);  // re-register them
            return this._controller;
        default:
            throw me._errors.ArgCount;
        }
    };

    me.prototype.bind = function () {
        this._view.on(this._controller);  // re-register them
        return this;
    };
    me.prototype.unbind = function () {
        this._view.off(this._controller);  // re-register them
        return this;
    };
    me.prototype.rebind = function () {  // shorthand
        return this.unbind().bind();
    };

    me.prototype._setProp = function (key, val) {
        this._attrs.prop(key, val);
        if (this._controller['{' + key + '} updated']) {
            this._controller['{' + key + '} updated'](key, val);  // 'model key updated' callback
        }
        if (this._controller.updated) {
            this._controller.updated(key, val);  // 'model updated' callback
        }
        return this;
    };

    me._jQuery = function (thing) {
        // wrap thing in jquery if it is a string.
        // among other things.
        if (thing && thing.jquery) {
            return thing;
        }
        return $(thing);
    };

    me._errors = {
        ArgCount: "ArgCount",
        NotImplemented: "NotImplemented",
        MalformedObject: "MalformedObject"
    };

    return me;
}(jQuery));