import Modernizr from "modernizr";
import yepnope from "yepnope";

yepnope([
    {
        test: Modernizr.fontface, // Check for font-face support
        yep: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
        nope: '/static/css/font-awesome.css'
    },
    {
        test: Modernizr.cssgradients, // Check for CSS gradients support
        yep: 'https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.css',
        nope: '/static/css/skeleton.css'
    }
]);
