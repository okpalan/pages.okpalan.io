export function loadScript(src, callback, defer = true) {
    const script = document.createElement('script');
    script.src = src;
    script.defer = defer; 
    script.onload = callback;
    script.onerror = () => {
        console.error('Error loading script:', src);
    };
    document.head.appendChild(script); 
}
