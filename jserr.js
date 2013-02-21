/*
    Error reporter by github.com/1337
    Sends request to server when a client-side error occurs

    MIT Licence
*/
var $ = $ || {};

(function ($, moduleName) {
    "use strict";
    // https://developer.mozilla.org/en/docs/DOM/window.onerror
    var gOldOnError = window.onerror;
    
    if ($[moduleName]) {  // cool, it's already there
        return;
    }

    var me = function (errorMsg, url, lineNumber) {
        if (gOldOnError) {
            // Call previous handler.
            return gOldOnError(errorMsg, url, lineNumber);
        }
        (new Image).src = '/jserr' + 
                          '?file=' + encodeURIComponent(url) + 
                          '&error=' + encodeURIComponent(errorMsg) +
                          '&desc=' + encodeURIComponent(lineNumber);
        return false;
    };

    
    // Override previous handler.
    window.onerror = me;

    if ($.pubSub) {
        $.pubSub(moduleName, [], me);  // register module
    }
    $[moduleName] = me;  // put it back (optional if you pubSub)
}($, /* [desired namespace] */ 'jserr'));
