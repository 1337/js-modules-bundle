/*
    Load Javascript and CSS files whenever you want them.

    Example
    $L ([  'http://code.jquery.com/jquery-1.7.1.js', 
           'http://ajaxian.com/wp-content/plugins/wp-stats/stats-css.css',
           'http://ajax.googleapis.com/ajax/libs/ext-core/3.1.0/ext-core.js'], function () {
        alert ($);
    });
*/
var $L = function (a, b) {
    b = b || function () {};
    var c = a.length,f = c,
        d = document.getElementsByTagName("head")[0],
        e = function () { --c || b() };
    while (f --> 0) {
        if (a[f].indexOf("js") !== -1) {
            var g = document.createElement("script");
            g.src = a[f];
            g.async = true;
            g.onload = e;
            g.onreadystatechange = function () {
                var a = g.readystate;
                if (a === "loaded" || a === "complete") e()
            }
        } else {
            c--;
            var g = document.createElement("link");
            g.rel = "stylesheet";
            g.type = "text/css";
            g.href = a[f];
        }
        d.appendChild(g);
    }
};