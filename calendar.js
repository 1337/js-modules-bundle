/*
 calendar generator by github.com/1337
 makes a calendar on the DOM by supplying year and month.
 does not style anything.

 MIT Licence
 */
var $ = $ || {};

(function ($, moduleName) {
    "use strict";
    if ($[moduleName]) {  // cool, it's already there
        return;
    }
    var me = function (iEl, iYear, iMonth) {
        var daysInMonth = function (year, month) {
                // return number of days in that month.
                return new Date(year, month, 0).getDate();
            },
            createCell = function (innerHTML, innerClass, cellType) {
                // makes a "day". innerHTML should be a day number.
                var el;

                cellType = cellType || 'td';
                innerClass = innerClass || 'day';
                el = document.createElement(cellType);

                if (innerHTML) {
                    el.innerHTML = innerHTML;
                }

                el.className += innerClass;
                return el;
            },
            createRow = function (startIndex, endIndex, startDay, innerClass) {
                // makes a "week". startDay should be the first day in that WEEK that
                // belongs to this month; if the 1st is on a friday, then startDay = 5.
                // startIndex and endIndex are the start and end date numbers that
                // appear on the week.
                var daysList = document.createElement('tr'),
                    weekBuffer = document.createDocumentFragment(),
                    i;
                startDay = startDay || 0;
                endIndex = endIndex || startIndex + 7 - startDay;
                innerClass = innerClass || 'week';

                daysList.className += innerClass;

                for (i = 0; i < startDay; i++) {
                    weekBuffer.appendChild(createCell('&nbsp;'));
                }

                for (i = startIndex; i < endIndex; i++) {
                    weekBuffer.appendChild(createCell(i));
                }

                daysList.appendChild(weekBuffer);
                return daysList;
            },
            createMonth = function (year, month, target, innerClass) {
                // makes a monthly calendar.
                // target is an optional dom element.
                // js has a 0-based month index. this month variable is a real month.
                var daysCount = daysInMonth(year, month),
                    firstDayOfMonth = new Date(year, month - 1, 1, 0, 0, 0, 0),
                    startingIndex = firstDayOfMonth.getDay(),
                    table = document.createElement('table'),
                    daysRendered = 1;

                innerClass = innerClass || 'month';
                table.className += innerClass;

                while (daysRendered <= daysCount) {
                    table.appendChild(createRow(
                        daysRendered,
                        Math.min(daysRendered + 7 - startingIndex, daysCount + 1),
                        startingIndex
                    ));

                    daysRendered += (7 - startingIndex);

                    // only the first week has a possible startingIndex
                    // so we reset it after the first iteration
                    startingIndex = 0;
                }

                if (target) {
                    target.appendChild(table);
                }

                return table;
            };

        createMonth(iYear, iMonth, iEl);
    };

    if ($.pubSub) {
        $.pubSub(moduleName, [], me);  // register module
    }
    $[moduleName] = me;  // put it back (optional if you pubSub)
}($, /* [desired namespace] */ 'calendar'));
