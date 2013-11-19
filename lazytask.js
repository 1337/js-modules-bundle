var DataSet = function (data) {
    var deferred = new $.Deferred(), self = this;

    // maps (fn) with (data) whenever the page is doing nothing.
    this.map = function (fn, timeout) {
        var results = new Array(data.length);
        $.map(data, function (o, i) {
            var time = 0;
            // setTimeouts are singly queued up anyway, so 
            // they are always executed in order
            setTimeout(function () {
                var start = new Date().getTime();
                try {
                    results[i] = fn.apply(self, [data[i], i]);
                } catch (e) {  // dummify result with undefined
                    deferred.reject(e, results);
                }

                time = ((time * i) +  // average runtime
                        (new Date().getTime() - start)) / (i + 1);
                if (i === data.length - 1) {  // last item done
                    return deferred.resolve(results);
                }
            }, Math.max(time, timeout, 1));
        });
        return deferred.promise();
    };

    this.data = function (arr) {
        data = arr;
    };
};

/*

new LazyTask(function (i) {
    return i * 2;
})
.map([1,2,3,4,5,6,7,8,9,10])
.done(function (data) {
    console.log(data);  // [2, 4, 6, 8, ...]
});

*/