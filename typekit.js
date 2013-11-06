/**
 * var foo = typeKit.expect(
 *     [Number, undefined, [Number, String]],
 *     function (a, b, c) {
 *        ...
 *     });
 */
var typeKit = {
    enabled: true,
    
    expect: function (types, fn) {
        var self = this;
        return function (/* *args */) {
            if (!typeKit.enabled) {
                // check disabled
                return fn.apply(self, args);
            }

            var i,
                args = Array.prototype.slice.apply(arguments);

            for (i = 0; i < args.length; i++) {
                if (types[i] === undefined) {
                    continue;  // wildcard pass
                } else if (
                    typeof args[i] === types[i] ||
                    (typeof args[i]).toLowerCase() === types[i].name.toLowerCase() ||
                    args[i] instanceof types[i]
                    ) {
                    continue;  // exact match pass
                // array contains something
                } else if (types[i] instanceof Array && types[i].length > 0) {
                    try {
                        if (types[i].indexOf(typeof args[i]) >= 0) {
                            // was a type
                            continue;
                        }
                        if (args[i] instanceof types[i]) {
                            // was an instance of
                            continue;  // within match pass
                        }
                    } catch (e) {  }
                    throw "Wrong argument type for position " + (i + 1) + 
                        "; expected [" + types[i].join(', ') + 
                        "], got " + args[i];
                } else {
                    throw "Wrong argument type for position " + (i + 1) + 
                        "; expected " + types[i] + ", got " + (typeof args[i]);
                }
            }
            return fn.apply(self, args);
        };
    }
};
