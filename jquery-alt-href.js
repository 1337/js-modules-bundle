(function ($) {
    "use strict";

    /**
     * Save bandwidth... given multiple buttons with the same 
     * caption, just give them shorter caption hrefs
     * 
     *    a alt="#wat"
     * 
     * and pass in {'wat': 'actual alt'}
     * 
     * @selector   the selector
     * @context    the parent element that handles the delegation
     * @alts       short:long alt pairs
     */
    $.fn.altHref = function (selector, context, alts) {
        return $(selector || '*', context || 'body')
            .hover(function (ev) {
                var $ev = $(ev.currentTarget),
                    href = $ev.prop('alt');

                if (!(href && href.length && href.indexOf('#') === 0)) {
                    return;  // this is not a valid href
                }

                if (!alts[href.substring(1)]) {
                    return;  // not in list of alts
                }

                $ev.prop('alt', alts[href.substring(1)]);
            }
        );
    };

}(window.jQuery || window.$));