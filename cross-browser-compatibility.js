/**
 * Wheel of Fate Character Sheet - Cross-Browser Compatibility Enhancer
 * This script addresses common cross-browser compatibility issues and provides
 * polyfills and fixes for various browsers.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Detect browser
    const userAgent = navigator.userAgent;
    const isIE = /*@cc_on!@*/false || !!document.documentMode;
    const isEdge = !isIE && !!window.StyleMedia;
    const isChrome = /Chrome/.test(userAgent) && /Google Inc/.test(navigator.vendor);
    const isSafari = /Safari/.test(userAgent) && /Apple Computer/.test(navigator.vendor);
    const isFirefox = userAgent.indexOf("Firefox") !== -1;
    
    console.log("Browser detection:", { 
        isIE, 
        isEdge, 
        isChrome, 
        isSafari, 
        isFirefox 
    });
    
    // Add browser-specific class to body
    const body = document.body;
    if (isIE) body.classList.add('browser-ie');
    if (isEdge) body.classList.add('browser-edge');
    if (isChrome) body.classList.add('browser-chrome');
    if (isSafari) body.classList.add('browser-safari');
    if (isFirefox) body.classList.add('browser-firefox');
    
    // Fix for CSS variables in IE11
    if (isIE) {
        console.warn("Internet Explorer detected. Adding CSS variable polyfill.");
        loadPolyfill('https://cdn.jsdelivr.net/npm/css-vars-ponyfill@2/dist/css-vars-ponyfill.min.js', function() {
            cssVars({
                onlyLegacy: true,
                watch: true
            });
        });
    }
    
    // Fix for SVG rendering issues in older browsers
    fixSvgRendering();
    
    // Fix for flexbox issues in IE and older browsers
    fixFlexboxIssues();
    
    // Fix for grid layout issues in IE and older Edge
    fixGridLayoutIssues();
    
    // Fix for CSS animations in older browsers
    fixCssAnimations();
    
    // Fix for input placeholder styling
    fixPlaceholderStyling();
    
    // Fix for focus styles consistency
    fixFocusStyles();
    
    // Fix for print media queries
    fixPrintMediaQueries();
    
    // Helper function to load polyfills
    function loadPolyfill(url, callback) {
        const script = document.createElement('script');
        script.src = url;
        script.onload = callback;
        document.head.appendChild(script);
    }
    
    // Fix SVG rendering issues in older browsers
    function fixSvgRendering() {
        // Replace SVG data URLs with more compatible versions if needed
        if (isIE || (isEdge && !window.CSS.supports('display', 'grid'))) {
            console.log("Fixing SVG rendering for older browsers");
            
            // Replace corner decorations with simpler versions for IE/old Edge
            const cornerElements = document.querySelectorAll('.character-sheet-corner');
            cornerElements.forEach(corner => {
                corner.style.backgroundImage = 'none';
                corner.style.border = '10px solid #8c7853';
                corner.style.borderRadius = '10px';
                corner.style.opacity = '0.6';
            });
        }
    }
    
    // Fix flexbox issues in IE and older browsers
    function fixFlexboxIssues() {
        if (isIE || (isEdge && !window.CSS.supports('display', 'grid'))) {
            console.log("Applying flexbox fixes for older browsers");
            
            // Add display: block fallback for flex containers in IE
            const flexContainers = document.querySelectorAll('.character-details, .trait-item, .distinction-header');
            flexContainers.forEach(container => {
                if (isIE) {
                    // For IE, we need to use traditional layout methods
                    container.style.display = 'block';
                    
                    // For character details, make them appear side by side
                    if (container.classList.contains('character-details')) {
                        const detailItems = container.querySelectorAll('.detail-item');
                        detailItems.forEach(item => {
                            item.style.display = 'inline-block';
                            item.style.width = '45%';
                            item.style.marginRight = '5%';
                        });
                    }
                    
                    // For trait items, ensure proper spacing
                    if (container.classList.contains('trait-item')) {
                        const traitName = container.querySelector('.trait-name');
                        const valueStatement = container.querySelector('.value-statement');
                        const diceRating = container.querySelector('.dice-rating');
                        
                        if (traitName) traitName.style.display = 'inline-block';
                        if (valueStatement) {
                            valueStatement.style.display = 'inline-block';
                            valueStatement.style.width = '60%';
                            valueStatement.style.marginLeft = '10px';
                            valueStatement.style.marginRight = '10px';
                        }
                        if (diceRating) diceRating.style.cssFloat = 'right';
                    }
                }
            });
        }
    }
    
    // Fix grid layout issues in IE and older Edge
    function fixGridLayoutIssues() {
        if (isIE || (isEdge && !window.CSS.supports('display', 'grid'))) {
            console.log("Applying grid layout fixes for older browsers");
            
            // Replace grid layout with table-based layout for IE
            const mainContent = document.querySelector('.main-content');
            if (mainContent && isIE) {
                mainContent.style.display = 'table';
                mainContent.style.width = '100%';
                
                // Create table rows and cells for the layout
                const sections = [
                    ['distinctions', 'values', 'talents'],
                    ['approaches', 'trackers', 'talents-continued'],
                    ['roles'],
                    ['notes']
                ];
                
                // Clear existing content and rebuild with table structure
                const originalContent = mainContent.innerHTML;
                mainContent.innerHTML = '';
                
                sections.forEach((rowSections, rowIndex) => {
                    const row = document.createElement('div');
                    row.style.display = 'table-row';
                    
                    rowSections.forEach(sectionName => {
                        const cell = document.createElement('div');
                        cell.style.display = 'table-cell';
                        cell.style.padding = '10px';
                        cell.style.verticalAlign = 'top';
                        
                        // Special handling for talents that span two rows
                        if (sectionName === 'talents-continued') {
                            // This is just a placeholder, we'll handle the rowspan in the talents cell
                            return;
                        }
                        
                        // Find the original section
                        const originalSection = document.querySelector(`.${sectionName}-section`);
                        if (originalSection) {
                            cell.appendChild(originalSection.cloneNode(true));
                            
                            // Special handling for talents that need to span two rows
                            if (sectionName === 'talents' && rowIndex === 0) {
                                cell.style.rowSpan = '2';
                            }
                            
                            // Special handling for roles and notes that need to span all columns
                            if (sectionName === 'roles' || sectionName === 'notes') {
                                cell.style.colSpan = '3';
                            }
                        }
                        
                        row.appendChild(cell);
                    });
                    
                    mainContent.appendChild(row);
                });
                
                // Restore event listeners and functionality
                // This would require re-initializing any JavaScript that was attached to the original elements
            }
        }
    }
    
    // Fix CSS animations in older browsers
    function fixCssAnimations() {
        if (isIE) {
            console.log("Disabling CSS animations for IE");
            
            // Disable animations in IE as they can cause performance issues
            const style = document.createElement('style');
            style.textContent = `
                @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
                    * {
                        animation: none !important;
                        transition: none !important;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Fix placeholder styling across browsers
    function fixPlaceholderStyling() {
        console.log("Normalizing placeholder styling across browsers");
        
        // Add cross-browser placeholder styling
        const placeholderStyle = document.createElement('style');
        placeholderStyle.textContent = `
            /* WebKit browsers */
            ::-webkit-input-placeholder {
                color: rgba(224, 224, 224, 0.5);
                font-style: italic;
            }
            
            /* Firefox 19+ */
            ::-moz-placeholder {
                color: rgba(224, 224, 224, 0.5);
                font-style: italic;
                opacity: 1;
            }
            
            /* IE 10+ */
            :-ms-input-placeholder {
                color: rgba(224, 224, 224, 0.5) !important;
                font-style: italic !important;
            }
            
            /* Edge */
            ::-ms-input-placeholder {
                color: rgba(224, 224, 224, 0.5);
                font-style: italic;
            }
        `;
        document.head.appendChild(placeholderStyle);
    }
    
    // Fix focus styles consistency across browsers
    function fixFocusStyles() {
        console.log("Normalizing focus styles across browsers");
        
        // Add consistent focus styles across browsers
        const focusStyle = document.createElement('style');
        focusStyle.textContent = `
            /* Consistent focus styles */
            *:focus {
                outline: 3px solid #c5a869 !important;
                outline-offset: 3px !important;
            }
            
            /* IE-specific focus styles */
            @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
                *:focus {
                    outline: 3px solid #c5a869 !important;
                    border-color: #c5a869 !important;
                }
            }
        `;
        document.head.appendChild(focusStyle);
        
        // Add focus event listeners for IE
        if (isIE) {
            const focusableElements = document.querySelectorAll('input, select, textarea, button, a, [tabindex]');
            focusableElements.forEach(element => {
                element.addEventListener('focus', function() {
                    this.style.outlineColor = '#c5a869';
                    this.style.outlineWidth = '3px';
                    this.style.outlineStyle = 'solid';
                    this.style.outlineOffset = '3px';
                });
                
                element.addEventListener('blur', function() {
                    this.style.outline = '';
                });
            });
        }
    }
    
    // Fix print media queries
    function fixPrintMediaQueries() {
        console.log("Ensuring print styles work across browsers");
        
        // Ensure print styles are properly loaded
        const printLink = document.querySelector('link[media="print"]');
        if (printLink && isIE) {
            // For IE, we'll create a new style element with the print styles
            fetch(printLink.href)
                .then(response => response.text())
                .then(css => {
                    const printStyle = document.createElement('style');
                    printStyle.textContent = `
                        @media print {
                            ${css}
                        }
                    `;
                    document.head.appendChild(printStyle);
                })
                .catch(error => console.error('Error loading print styles:', error));
        }
        
        // Add print button event listener
        const printButton = document.querySelector('.print-button');
        if (printButton) {
            printButton.addEventListener('click', function() {
                // For IE, we need to explicitly apply print styles
                if (isIE) {
                    document.body.classList.add('printing');
                    setTimeout(() => {
                        window.print();
                        setTimeout(() => {
                            document.body.classList.remove('printing');
                        }, 1000);
                    }, 100);
                } else {
                    window.print();
                }
            });
        }
    }
    
    // Log completion
    console.log("Cross-browser compatibility enhancements applied");
});
</script>
</content>