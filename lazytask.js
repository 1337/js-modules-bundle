var LazyTask = function (fn) {
    var self = this,
        deferred = new $.Deferred();

    this.run = function (data, timeout) {
        var i,
            results = new Array(data.length);

        for (i = 0; i < data.length; i++) {
            (function (i) {
                setTimeout(function () {
                    try {
                        results[i] = fn.call(self, data[i]);
                    } catch (e) {
                        deferred.reject(results);
                    }

                    if (i === data.length - 1) {
                        deferred.resolve(results);
                    }
                }, timeout || 1);
            }(i));
        }

        return deferred.promise();
    };
};

/*

new LazyTask(function (i) {
    return i * 2;
})
.run([1,2,3,4,5,6,7,8,9,10])
.done(function (data) {
    console.log(data);  // [2, 4, 6, 8, ...]
});

*/
