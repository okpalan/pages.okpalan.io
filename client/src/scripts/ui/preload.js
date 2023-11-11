import yepnope from "yepnope";
const testJS = () => (typeof navigator !== 'undefined' &&
    navigator.userAgent &&
    navigator.userAgent.indexOf('Mozilla/5.0') >= 0 &&
    navigator.userAgent.indexOf('Trident/') < 0 &&
    navigator.userAgent.indexOf('Edge/') < 0);

Reflect.construct(yepnope, ([
    {
        test: testJS(),
        yep: 'https://cdnjs.cloudflare.com/ajax/libs/zepto/1.2.0/zepto.min.js',
        nope: '/static/js/zepto.min.js'
    },
    {
        test: !!window.FontFace, // Check for font-face support
        yep: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
        nope: '/static/css/font-awesome.css'
    },
    {
        test: !!document.styleSheets.length, // Check if there are active stylesheets
        yep: 'https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css',
        nope: '/static/css/skeleton.css'
    }
]))