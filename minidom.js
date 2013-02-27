/* 
    Mini DOM by github.com/1337
    Provides DOM traversal and selection (something like jQuery)

    MIT Licence
 */

(function (context, doc) {
    var namespace = '$',  // pick your own to avoid collision.

        isObject = function (thing) {
            return (typeof thing === 'object');
        },

        me = context[namespace] = function (param) {
            me.items = param || [];  // access items.

            if (typeof me.items === 'string') {
                // if it is [...] or {...}, it's already good to go
                me.items = doc.querySelectorAll(me.items);
            }

            return me;
        };

    me.css = function (styleMap, items) {
        // apply styles to each item. use javascript style names.
        // if items is supplied, run func on each items.
        items = items || me.items;

        return me.each(function (idx, obj) {
            me.extend(obj.style, me.props(styleMap).items);
        }, items);
    };

    me.each = function (func, items) {
        // execute func on each item in param.
        // if items is supplied, run func on each items.
        items = items || me.items;

        if (isObject(items)) {
            for (var i in me.props(items)) {
                func(i, items[i]);
            }
        } else {
            for (var i = 0; i < items.length; ++i) {
                func(i, items[i]);
            }
        }
        return me(items);
    };

    me.extend = function () {
        // merge arguments[1:] into arguments[0]. returns arguments[0].
        var args = arguments;
        for (var h = 1; h < args.length; h++) {
            for (var i in me.props(args[h])) {
                args[0][i] = args[h][i];
            }
        }
        return args[0];
    };

    me.filter = function (func, inverse, items) {
        // retain only those in param which lets func evaluate to true.
        // if items is supplied, run func on each items.

        inverse = inverse || false;
        items = items || me.items;

        if (isObject(items)) {
            var retention = {};
            for (var i in items) {
                if (items.hasOwnProperty(i)) {
                    retention[i] = items[i];
                }
            }
        } else {
            var retention = [];
            for (var i = 0; i < items.length; ++i) {
                if (func(items[i]) === !inverse) {
                    retention.push(items[i]);
                }
            }
        }
        return me(retention);
    };

    me.map = function (func, items) {
        // turn each item in param into func(param).
        // if items is supplied, run func on each items.
        items = items || me.items;

        if (isObject(items)) {
            for (var i in me.props(items)) {
                items[i] = func(items[i]);
            }
        } else {
            if (Array.map) {
                return me(items.map(func));
            } else {
                for (var i = 0; i < items.length; ++i) {
                    items[i] = func(items[i]);
                }
            }
        }
        return me(items);
    };

    me.prop = function (type, props) {
        // type = "div", "hr", etc or existing object
        // props = map of property names and values
        var elem = (typeof type === 'object')
            ? type  // reuse
            : doc.createElement(type);  // create
        for (var i in me.props(props)) {
            elem[i] = props[i];
        }
        return me(me.items);
    };

    me.props = function (items) {
        // retain only those in properties param that belonged to itself.
        // if items is supplied, run func on each items.
        items = items || me.items;

        return me(items).filter(items.hasOwnProperty);
    };
})(window, document);