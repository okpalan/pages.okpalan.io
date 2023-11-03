import yepnope from "yepnope";

yepnope([
    {
        test: !!window.FontFace, // Check for font-face support
        yep: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
        nope: '/static/css/font-awesome.css'
    },
    {
        test: !!document.styleSheets.length, // Check if there are active stylesheets
        yep: 'https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.css',
        nope: '/static/css/skeleton.css'
    }
]);