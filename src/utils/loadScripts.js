export function loadScripts(scriptLocations, callback) {
    var scriptsToLoad = scriptLocations.length;
    var scriptsLoaded = 0;

    function loadScript(src) {
        var script = document.createElement('script');
        script.src = src;
        script.defer = true;
        script.onload = scriptLoaded;
        script.onerror = scriptLoadError;
        document.head.appendChild(script);
    }

    function scriptLoaded() {
        scriptsLoaded++;
        if (scriptsLoaded === scriptsToLoad) {
            callback(); // All scripts have been loaded
        }
    }

    function scriptLoadError() {
        console.error('Failed to load a script.');
    }

    scriptLocations.forEach(function (src) {
        loadScript(src);
    });
} 