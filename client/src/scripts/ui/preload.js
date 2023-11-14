import yepnope from "yepnope";
const testJS = () => (typeof navigator !== 'undefined' &&
    navigator.userAgent &&
    navigator.userAgent.indexOf('Mozilla/5.0') >= 0 &&
    navigator.userAgent.indexOf('Trident/') < 0 &&
    navigator.userAgent.indexOf('Edge/') < 0);
