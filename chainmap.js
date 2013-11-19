/**
 * Python3 ChainMap equivalent: fast multi-dict key access
 *
 * Pass in any number of dicts as *args.
 * Use .get(key) to retrieve the value of the first dict that has the key.
 * Note that a kv of {'str': undefined} still counts as 'has the key'.
 *
 * @constructor
 */
var ChainMap = function () {
    var i,
        maps = Array.prototype.slice.call(arguments);

    /**
     * Return the value, or undefined.
     *
     * @param {string} key
     * @param {*} defaultValue
     * @returns {*|undefined}
     */
    this.get = function (key, defaultValue) {
        for (i = 0; i < maps.length; i++) {
            if (key in maps[i]) {
                if (maps[i].hasOwnProperty(key)) {
                    return maps[i][key];
                }
            }
        }
        return defaultValue;
    };

    /**
     * Since ChainMap looks up from left to right, adding a new dict
     * in front of the chain gives it highest priority.
     *
     * @type {Function}
     * @param {Object} newDict
     */
    this.set = this.update = function (newDict) {
        maps.unshift(newDict);
    };

    /**
     * Return a single dict that reads the same as the ChainMap object.
     */
    this.merge = function () {
        var args = [{}].concat(_.clone(maps).reverse());
        return _.extend.apply(_.extend, args);
    };
};
