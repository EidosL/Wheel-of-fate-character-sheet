/**
 * Wheel of Fate Character Sheet - Browser Testing Script
 * This script runs tests to verify cross-browser compatibility
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Running browser compatibility tests...');
    
    // Create test results container
    const testContainer = document.createElement('div');
    testContainer.id = 'browser-test-results';
    testContainer.style.position = 'fixed';
    testContainer.style.top = '10px';
    testContainer.style.right = '10px';
    testContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    testContainer.style.color = '#fff';
    testContainer.style.padding = '10px';
    testContainer.style.borderRadius = '5px';
    testContainer.style.zIndex = '9999';
    testContainer.style.maxWidth = '300px';
    testContainer.style.maxHeight = '400px';
    testContainer.style.overflow = 'auto';
    testContainer.style.fontSize = '12px';
    testContainer.style.fontFamily = 'monospace';
    testContainer.style.display = 'none'; // Hidden by default
    
    // Add toggle button
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Show Test Results';
    toggleButton.style.position = 'fixed';
    toggleButton.style.top = '10px';
    toggleButton.style.right = '10px';
    toggleButton.style.zIndex = '10000';
    toggleButton.style.padding = '5px 10px';
    toggleButton.style.backgroundColor = '#c5a869';
    toggleButton.style.color = '#000';
    toggleButton.style.border = 'none';
    toggleButton.style.borderRadius = '3px';
    toggleButton.style.cursor = 'pointer';
    
    document.body.appendChild(testContainer);
    document.body.appendChild(toggleButton);
    
    toggleButton.addEventListener('click', function() {
        if (testContainer.style.display === 'none') {
            testContainer.style.display = 'block';
            toggleButton.textContent = 'Hide Test Results';
        } else {
            testContainer.style.display = 'none';
            toggleButton.textContent = 'Show Test Results';
        }
    });
    
    // Helper function to add test result
    function addTestResult(name, passed, details = '') {
        const result = document.createElement('div');
        result.style.marginBottom = '5px';
        result.style.borderLeft = passed ? '3px solid #4CAF50' : '3px solid #F44336';
        result.style.paddingLeft = '5px';
        
        const status = passed ? '✓' : '✗';
        const statusColor = passed ? '#4CAF50' : '#F44336';
        
        result.innerHTML = `<span style="color: ${statusColor}; font-weight: bold;">${status}</span> <strong>${name}</strong>`;
        
        if (details) {
            const detailsElem = document.createElement('div');
            detailsElem.style.marginLeft = '15px';
            detailsElem.style.fontSize = '10px';
            detailsElem.style.color = '#ccc';
            detailsElem.textContent = details;
            result.appendChild(detailsElem);
        }
        
        testContainer.appendChild(result);
        console.log(`${passed ? 'PASS' : 'FAIL'}: ${name}${details ? ' - ' + details : ''}`);
    }
    
    // Test browser detection
    function testBrowserDetection() {
        const userAgent = navigator.userAgent;
        const isIE = /*@cc_on!@*/false || !!document.documentMode;
        const isEdge = !isIE && !!window.StyleMedia;
        const isChrome = /Chrome/.test(userAgent) && /Google Inc/.test(navigator.vendor);
        const isSafari = /Safari/.test(userAgent) && /Apple Computer/.test(navigator.vendor);
        const isFirefox = userAgent.indexOf("Firefox") !== -1;
        
        addTestResult('Browser Detection', true, 
            `Detected: ${isIE ? 'IE' : isEdge ? 'Edge' : isChrome ? 'Chrome' : isSafari ? 'Safari' : isFirefox ? 'Firefox' : 'Unknown'}`);
        
        return { isIE, isEdge, isChrome, isSafari, isFirefox };
    }
    
    // Test CSS variables support
    function testCssVariables() {
        const testElem = document.createElement('div');
        testElem.style.setProperty('--test-var', 'red');
        testElem.style.setProperty('color', 'var(--test-var)');
        document.body.appendChild(testElem);
        
        const computedColor = getComputedStyle(testElem).color;
        document.body.removeChild(testElem);
        
        const supported = computedColor === 'rgb(255, 0, 0)' || computedColor === 'red';
        addTestResult('CSS Variables Support', supported, 
            supported ? 'Native support detected' : 'Using fallback values');
        
        return supported;
    }
    
    // Test CSS Grid support
    function testCssGrid() {
        const supported = window.CSS && CSS.supports && CSS.supports('display', 'grid');
        addTestResult('CSS Grid Support', supported, 
            supported ? 'Native support detected' : 'Using fallback layout');
        
        return supported;
    }
    
    // Test Flexbox support
    function testFlexbox() {
        const supported = window.CSS && CSS.supports && CSS.supports('display', 'flex');
        addTestResult('Flexbox Support', supported, 
            supported ? 'Native support detected' : 'Using fallback layout');
        
        return supported;
    }
    
    // Test CSS Animations support
    function testCssAnimations() {
        const supported = window.CSS && CSS.supports && 
            (CSS.supports('animation-name', 'test') || CSS.supports('-webkit-animation-name', 'test'));
        addTestResult('CSS Animations Support', supported, 
            supported ? 'Native support detected' : 'Animations disabled');
        
        return supported;
    }
    
    // Test SVG support
    function testSvgSupport() {
        const supported = !!document.createElementNS && 
            !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect;
        addTestResult('SVG Support', supported, 
            supported ? 'Native support detected' : 'Using fallback graphics');
        
        return supported;
    }
    
    // Test border-image support
    function testBorderImage() {
        const supported = window.CSS && CSS.supports && 
            (CSS.supports('border-image', 'linear-gradient(red, blue) 1') || 
             CSS.supports('-webkit-border-image', 'linear-gradient(red, blue) 1'));
        addTestResult('Border Image Support', supported, 
            supported ? 'Native support detected' : 'Using fallback borders');
        
        return supported;
    }
    
    // Test box-shadow support
    function testBoxShadow() {
        const supported = window.CSS && CSS.supports && 
            (CSS.supports('box-shadow', '0 0 5px black') || 
             CSS.supports('-webkit-box-shadow', '0 0 5px black'));
        addTestResult('Box Shadow Support', supported, 
            supported ? 'Native support detected' : 'Using fallback borders');
        
        return supported;
    }
    
    // Test text-shadow support
    function testTextShadow() {
        const supported = window.CSS && CSS.supports && 
            (CSS.supports('text-shadow', '0 0 5px black') || 
             CSS.supports('-webkit-text-shadow', '0 0 5px black'));
        addTestResult('Text Shadow Support', supported, 
            supported ? 'Native support detected' : 'Text shadows disabled');
        
        return supported;
    }
    
    // Test background-blend-mode support
    function testBackgroundBlendMode() {
        const supported = window.CSS && CSS.supports && CSS.supports('background-blend-mode', 'overlay');
        addTestResult('Background Blend Mode Support', supported, 
            supported ? 'Native support detected' : 'Blend modes disabled');
        
        return supported;
    }
    
    // Test CSS Grid gap support
    function testGridGap() {
        const supported = window.CSS && CSS.supports && CSS.supports('gap', '10px');
        addTestResult('CSS Grid Gap Support', supported, 
            supported ? 'Native support detected' : 'Using fallback spacing');
        
        return supported;
    }
    
    // Test print media query support
    function testPrintMediaQuery() {
        const styleSheet = document.createElement('style');
        styleSheet.textContent = '@media print { #print-test { display: none !important; } }';
        document.head.appendChild(styleSheet);
        
        const testElem = document.createElement('div');
        testElem.id = 'print-test';
        document.body.appendChild(testElem);
        
        // We can't actually test print media query directly, so we'll assume it's supported
        // in modern browsers and just check if the style element was created successfully
        const supported = !!styleSheet.sheet;
        
        document.head.removeChild(styleSheet);
        document.body.removeChild(testElem);
        
        addTestResult('Print Media Query Support', supported, 
            supported ? 'Should work correctly' : 'May have issues with print styles');
        
        return supported;
    }
    
    // Test CSS calc() support
    function testCalcSupport() {
        const supported = window.CSS && CSS.supports && CSS.supports('width', 'calc(10px + 10px)');
        addTestResult('CSS calc() Support', supported, 
            supported ? 'Native support detected' : 'Using fallback calculations');
        
        return supported;
    }
    
    // Test layout rendering
    function testLayoutRendering() {
        // Check if main sections are visible
        const mainContent = document.querySelector('.main-content');
        const sections = document.querySelectorAll('.trait-box');
        
        const mainContentVisible = mainContent && getComputedStyle(mainContent).display !== 'none';
        const sectionsVisible = sections.length > 0 && 
            Array.from(sections).every(section => getComputedStyle(section).display !== 'none');
        
        addTestResult('Layout Rendering', mainContentVisible && sectionsVisible, 
            `Main content: ${mainContentVisible ? 'OK' : 'Issues'}, Sections: ${sectionsVisible ? 'OK' : 'Issues'}`);
        
        return mainContentVisible && sectionsVisible;
    }
    
    // Test interactive elements
    function testInteractiveElements() {
        const diceRatings = document.querySelectorAll('.dice-rating');
        const circles = document.querySelectorAll('.circle');
        const inputs = document.querySelectorAll('input[type="text"]');
        
        const diceRatingsOk = diceRatings.length > 0;
        const circlesOk = circles.length > 0;
        const inputsOk = inputs.length > 0;
        
        addTestResult('Interactive Elements', diceRatingsOk && circlesOk && inputsOk, 
            `Dice ratings: ${diceRatingsOk ? 'OK' : 'Issues'}, Trackers: ${circlesOk ? 'OK' : 'Issues'}, Inputs: ${inputsOk ? 'OK' : 'Issues'}`);
        
        return diceRatingsOk && circlesOk && inputsOk;
    }
    
    // Run all tests
    function runAllTests() {
        const browserInfo = testBrowserDetection();
        const cssVarsSupported = testCssVariables();
        const gridSupported = testCssGrid();
        const flexboxSupported = testFlexbox();
        const animationsSupported = testCssAnimations();
        const svgSupported = testSvgSupport();
        const borderImageSupported = testBorderImage();
        const boxShadowSupported = testBoxShadow();
        const textShadowSupported = testTextShadow();
        const blendModeSupported = testBackgroundBlendMode();
        const gridGapSupported = testGridGap();
        const printMediaQuerySupported = testPrintMediaQuery();
        const calcSupported = testCalcSupport();
        
        // Wait a bit for layout to render
        setTimeout(() => {
            const layoutOk = testLayoutRendering();
            const interactiveElementsOk = testInteractiveElements();
            
            // Add summary
            const allPassed = cssVarsSupported && gridSupported && flexboxSupported && 
                animationsSupported && svgSupported && borderImageSupported && 
                boxShadowSupported && textShadowSupported && blendModeSupported && 
                gridGapSupported && printMediaQuerySupported && calcSupported && 
                layoutOk && interactiveElementsOk;
            
            const summaryElem = document.createElement('div');
            summaryElem.style.marginTop = '10px';
            summaryElem.style.padding = '5px';
            summaryElem.style.borderTop = '1px solid #ccc';
            summaryElem.style.fontWeight = 'bold';
            summaryElem.style.color = allPassed ? '#4CAF50' : '#F44336';
            summaryElem.textContent = allPassed ? 
                'All tests passed! Browser compatibility looks good.' : 
                'Some tests failed. Browser compatibility issues detected.';
            
            testContainer.appendChild(summaryElem);
        }, 500);
    }
    
    // Run tests
    runAllTests();
});
</content>