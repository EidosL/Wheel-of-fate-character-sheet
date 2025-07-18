/**
 * Integration script to add cross-browser compatibility files to the character sheet
 */

document.addEventListener('DOMContentLoaded', function() {
    // Add cross-browser CSS
    const crossBrowserCss = document.createElement('link');
    crossBrowserCss.rel = 'stylesheet';
    crossBrowserCss.href = 'cross-browser-compatibility.css';
    document.head.appendChild(crossBrowserCss);
    
    // Add cross-browser JS
    const crossBrowserJs = document.createElement('script');
    crossBrowserJs.src = 'cross-browser-compatibility.js';
    document.head.appendChild(crossBrowserJs);
    
    // Add browser test script (only in development)
    const isDevelopment = true; // Set to false for production
    if (isDevelopment) {
        const browserTestJs = document.createElement('script');
        browserTestJs.src = 'browser-test.js';
        document.head.appendChild(browserTestJs);
    }
    
    console.log('Cross-browser compatibility files loaded');
});
</content>