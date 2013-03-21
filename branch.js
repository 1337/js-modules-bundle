/*
    Branch: precondition branching by github.com/1337
    Does one thing or the other (or none, if you want) depending on
    input mapping.

    MIT Licence
*/
var $ = $ || {};

(function ($, moduleName) {
    "use strict";
    var me = {},
        objectIdentityHelper = function (obj1, obj2) {
            // TODO: refactor
        };

    if ($[moduleName]) {  // cool, it's already there
        return;
    }

    // this doesn't do anything because next line overwrites it
    var wildcard = anything = {};  // works because ({} == {}) is false

    me = function (input, branchObj) {
        // input: list
        // branchObj: obj
        //
        // branchObj also supports three keys: ifNone, ifSome, and ifAll.
        // if ifSome or ifAll is supplied, then singlular precondition matches
        // will not be returned.
        // if ifSome AND ifAll are supplied, then ifSome will not be returned
        // if ifAll precondition is met.
        //
        // supply branch.anything to indicate that the element matches anything.
        var i, j, matchCases = {};

        for (i = 0; i < input.length; i++) {
            // go through all inputs, one by one.
            for (j = 0; j < branchObj.length; j++) {
                if (branchObj.hasOwnProperty(j)) {
                    if (j.substr(0, 2) !== 'if') {
                        if (input[i] === branchObj[j] || input[i] === anything) {
                            if (matchCases[i] !== null) {  // null is reset case
                                matchCases[i] = branchObj[j];  // this case succeeded
                            }
                        } else {
                            matchCases[i] = null;  // this case did not
                        }
                    }  // else, why would you...
                }
            }

            // cleanup
            if (matchCases[i] === null) {
                // we can do this because matchCases is not being iterated
                delete matchCases[i];
            } else {
                // this case is identical to the input
                // (or matches the wildcard)
            }
        }

        if (matchCases.length === 0) {
            // none of the defined preconditions matched the input.
            return branchObj.ifNone;
        } else if (matchCases.length === branchObj.length && 
                   branchObj.ifAll !== undefined) {
            // all of the defined preconditions matched the input.
            // however that happened (e.g. only one condition is defined...),
            // this one will be returned.
            return branchObj.ifAll;
        } else if (matchCases.length < branchObj.length &&
                   matchCases.length > 1 &&
                   branchObj.ifSome !== undefined) {
            // more than one of the defined preconditions matched the input.
            // this one will be returned.
            return branchObj.ifSome;
        } else if (matchCases.length === 1) {
            for (i in matchCases) {
                if (matchCases.hasOwnProperty(i)) {
                    return matchCases[i];
                }
            }
            // if the captured variable was "good", then it will never reach
            // here and cause an error
            throw ('Cannot find exception from object');
        } else {
            // neither none, one, some, nor all. how?
            throw ('Unexpected error');
        }
    };

    if ($.pubSub) {
        $.pubSub(moduleName, [], me);  // register module
    }
    $[moduleName] = me;  // put it back (optional if you pubSub)
}($, /* [desired namespace] */ 'branch'));
