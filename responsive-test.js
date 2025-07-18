/**
 * Wheel of Fate Character Sheet - Responsive Testing Tool
 * This script adds a responsive testing interface to preview the character sheet
 * at different screen sizes and device orientations.
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing responsive testing tool...');
    
    // Create responsive testing UI
    const testingUI = document.createElement('div');
    testingUI.id = 'responsive-testing-ui';
    testingUI.style.position = 'fixed';
    testingUI.style.bottom = '10px';
    testingUI.style.left = '10px';
    testingUI.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    testingUI.style.color = '#fff';
    testingUI.style.padding = '10px';
    testingUI.style.borderRadius = '5px';
    testingUI.style.zIndex = '9999';
    testingUI.style.fontFamily = 'Arial, sans-serif';
    testingUI.style.fontSize = '14px';
    testingUI.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    testingUI.style.display = 'none'; // Hidden by default
    
    // Add toggle button
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Responsive Testing';
    toggleButton.style.position = 'fixed';
    toggleButton.style.bottom = '10px';
    toggleButton.style.left = '10px';
    toggleButton.style.zIndex = '10000';
    toggleButton.style.padding = '5px 10px';
    toggleButton.style.backgroundColor = '#c5a869';
    toggleButton.style.color = '#000';
    toggleButton.style.border = 'none';
    toggleButton.style.borderRadius = '3px';
    toggleButton.style.cursor = 'pointer';
    toggleButton.style.fontFamily = 'Arial, sans-serif';
    
    // Create UI content
    testingUI.innerHTML = `
        <h3 style="margin-top: 0; margin-bottom: 10px; text-align: center;">Responsive Testing</h3>
        
        <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px;">Select Device:</label>
            <select id="device-select" style="width: 100%; padding: 5px; background: #333; color: #fff; border: 1px solid #666;">
                <option value="desktop">Desktop (1920×1080)</option>
                <option value="laptop">Laptop (1366×768)</option>
                <option value="tablet-landscape">Tablet - Landscape (1024×768)</option>
                <option value="tablet-portrait">Tablet - Portrait (768×1024)</option>
                <option value="mobile-landscape">Mobile - Landscape (640×360)</option>
                <option value="mobile-portrait">Mobile - Portrait (360×640)</option>
                <option value="custom">Custom Size</option>
            </select>
        </div>
        
        <div id="custom-size" style="margin-bottom: 15px; display: none;">
            <div style="display: flex; gap: 10px; margin-bottom: 5px;">
                <input type="number" id="custom-width" placeholder="Width" style="flex: 1; padding: 5px; background: #333; color: #fff; border: 1px solid #666;">
                <span style="line-height: 30px;">×</span>
                <input type="number" id="custom-height" placeholder="Height" style="flex: 1; padding: 5px; background: #333; color: #fff; border: 1px solid #666;">
            </div>
            <button id="apply-custom" style="width: 100%; padding: 5px; background: #c5a869; color: #000; border: none; cursor: pointer;">Apply Custom Size</button>
        </div>
        
        <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px;">Current Viewport:</label>
            <div id="current-size" style="padding: 5px; background: #333; text-align: center; font-weight: bold;"></div>
        </div>
        
        <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px;">Breakpoints:</label>
            <div style="display: flex; gap: 5px; flex-wrap: wrap;">
                <button class="breakpoint-btn" data-width="1200" style="flex: 1; padding: 5px; background: #444; color: #fff; border: 1px solid #666; cursor: pointer;">1200px</button>
                <button class="breakpoint-btn" data-width="992" style="flex: 1; padding: 5px; background: #444; color: #fff; border: 1px solid #666; cursor: pointer;">992px</button>
                <button class="breakpoint-btn" data-width="768" style="flex: 1; padding: 5px; background: #444; color: #fff; border: 1px solid #666; cursor: pointer;">768px</button>
                <button class="breakpoint-btn" data-width="576" style="flex: 1; padding: 5px; background: #444; color: #fff; border: 1px solid #666; cursor: pointer;">576px</button>
                <button class="breakpoint-btn" data-width="480" style="flex: 1; padding: 5px; background: #444; color: #fff; border: 1px solid #666; cursor: pointer;">480px</button>
            </div>
        </div>
        
        <div style="margin-bottom: 15px;">
            <button id="toggle-grid" style="width: 100%; padding: 5px; background: #444; color: #fff; border: 1px solid #666; cursor: pointer;">Show Grid Overlay</button>
        </div>
        
        <div style="margin-bottom: 15px;">
            <button id="toggle-orientation" style="width: 100%; padding: 5px; background: #444; color: #fff; border: 1px solid #666; cursor: pointer;">Switch Orientation</button>
        </div>
        
        <div>
            <button id="reset-view" style="width: 100%; padding: 5px; background: #c5a869; color: #000; border: none; cursor: pointer;">Reset View</button>
        </div>
    `;
    
    document.body.appendChild(testingUI);
    document.body.appendChild(toggleButton);
    
    // Toggle testing UI visibility
    toggleButton.addEventListener('click', function() {
        if (testingUI.style.display === 'none') {
            testingUI.style.display = 'block';
            toggleButton.textContent = 'Hide Testing';
            updateCurrentSize();
        } else {
            testingUI.style.display = 'none';
            toggleButton.textContent = 'Responsive Testing';
        }
    });
    
    // Get UI elements
    const deviceSelect = document.getElementById('device-select');
    const customSizeDiv = document.getElementById('custom-size');
    const customWidthInput = document.getElementById('custom-width');
    const customHeightInput = document.getElementById('custom-height');
    const applyCustomBtn = document.getElementById('apply-custom');
    const currentSizeDiv = document.getElementById('current-size');
    const breakpointBtns = document.querySelectorAll('.breakpoint-btn');
    const toggleGridBtn = document.getElementById('toggle-grid');
    const toggleOrientationBtn = document.getElementById('toggle-orientation');
    const resetViewBtn = document.getElementById('reset-view');
    
    // Device presets
    const devicePresets = {
        'desktop': { width: 1920, height: 1080 },
        'laptop': { width: 1366, height: 768 },
        'tablet-landscape': { width: 1024, height: 768 },
        'tablet-portrait': { width: 768, height: 1024 },
        'mobile-landscape': { width: 640, height: 360 },
        'mobile-portrait': { width: 360, height: 640 }
    };
    
    // Create viewport simulator
    const viewportSimulator = document.createElement('div');
    viewportSimulator.id = 'viewport-simulator';
    viewportSimulator.style.position = 'fixed';
    viewportSimulator.style.top = '0';
    viewportSimulator.style.left = '0';
    viewportSimulator.style.width = '100%';
    viewportSimulator.style.height = '100%';
    viewportSimulator.style.backgroundColor = '#f0f0f0';
    viewportSimulator.style.zIndex = '9998';
    viewportSimulator.style.overflow = 'auto';
    viewportSimulator.style.display = 'none';
    
    // Create iframe container
    const iframeContainer = document.createElement('div');
    iframeContainer.id = 'iframe-container';
    iframeContainer.style.position = 'relative';
    iframeContainer.style.margin = '20px auto';
    iframeContainer.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.5)';
    iframeContainer.style.transition = 'width 0.3s, height 0.3s';
    iframeContainer.style.backgroundColor = '#fff';
    
    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.id = 'responsive-iframe';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.src = window.location.href;
    
    // Create grid overlay
    const gridOverlay = document.createElement('div');
    gridOverlay.id = 'grid-overlay';
    gridOverlay.style.position = 'absolute';
    gridOverlay.style.top = '0';
    gridOverlay.style.left = '0';
    gridOverlay.style.width = '100%';
    gridOverlay.style.height = '100%';
    gridOverlay.style.pointerEvents = 'none';
    gridOverlay.style.display = 'none';
    gridOverlay.style.zIndex = '1';
    
    // Create grid lines
    for (let i = 0; i < 12; i++) {
        const gridLine = document.createElement('div');
        gridLine.style.position = 'absolute';
        gridLine.style.top = '0';
        gridLine.style.bottom = '0';
        gridLine.style.left = (i * (100 / 12)) + '%';
        gridLine.style.width = '1px';
        gridLine.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
        gridOverlay.appendChild(gridLine);
    }
    
    // Add horizontal breakpoint indicators
    const breakpoints = [1200, 992, 768, 576, 480];
    breakpoints.forEach(bp => {
        const indicator = document.createElement('div');
        indicator.style.position = 'absolute';
        indicator.style.top = '0';
        indicator.style.bottom = '0';
        indicator.style.width = '2px';
        indicator.style.backgroundColor = 'rgba(0, 128, 255, 0.5)';
        indicator.style.zIndex = '2';
        indicator.dataset.breakpoint = bp;
        indicator.style.display = 'none';
        gridOverlay.appendChild(indicator);
    });
    
    // Assemble the viewport simulator
    iframeContainer.appendChild(iframe);
    iframeContainer.appendChild(gridOverlay);
    viewportSimulator.appendChild(iframeContainer);
    document.body.appendChild(viewportSimulator);
    
    // Update current viewport size display
    function updateCurrentSize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        currentSizeDiv.textContent = `${width}px × ${height}px`;
        
        // Update breakpoint indicators
        breakpointBtns.forEach(btn => {
            const breakpoint = parseInt(btn.dataset.width);
            if (width <= breakpoint) {
                btn.style.backgroundColor = '#c5a869';
                btn.style.color = '#000';
            } else {
                btn.style.backgroundColor = '#444';
                btn.style.color = '#fff';
            }
        });
    }
    
    // Handle device selection
    deviceSelect.addEventListener('change', function() {
        const selectedDevice = this.value;
        
        if (selectedDevice === 'custom') {
            customSizeDiv.style.display = 'block';
        } else {
            customSizeDiv.style.display = 'none';
            
            if (devicePresets[selectedDevice]) {
                const preset = devicePresets[selectedDevice];
                resizeViewport(preset.width, preset.height);
            }
        }
    });
    
    // Handle custom size application
    applyCustomBtn.addEventListener('click', function() {
        const width = parseInt(customWidthInput.value);
        const height = parseInt(customHeightInput.value);
        
        if (width && height) {
            resizeViewport(width, height);
        }
    });
    
    // Handle breakpoint buttons
    breakpointBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const width = parseInt(this.dataset.width);
            const height = window.innerHeight;
            resizeViewport(width, height);
        });
    });
    
    // Toggle grid overlay
    let gridVisible = false;
    toggleGridBtn.addEventListener('click', function() {
        gridVisible = !gridVisible;
        gridOverlay.style.display = gridVisible ? 'block' : 'none';
        this.textContent = gridVisible ? 'Hide Grid Overlay' : 'Show Grid Overlay';
    });
    
    // Toggle orientation
    toggleOrientationBtn.addEventListener('click', function() {
        const currentWidth = parseInt(iframeContainer.style.width);
        const currentHeight = parseInt(iframeContainer.style.height);
        resizeViewport(currentHeight, currentWidth);
    });
    
    // Reset view
    resetViewBtn.addEventListener('click', function() {
        viewportSimulator.style.display = 'none';
        document.body.style.overflow = '';
    });
    
    // Resize viewport
    function resizeViewport(width, height) {
        // Show viewport simulator
        viewportSimulator.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Set iframe container size
        iframeContainer.style.width = width + 'px';
        iframeContainer.style.height = height + 'px';
        
        // Update current size display
        currentSizeDiv.textContent = `${width}px × ${height}px`;
        
        // Update breakpoint indicators
        breakpointBtns.forEach(btn => {
            const breakpoint = parseInt(btn.dataset.width);
            if (width <= breakpoint) {
                btn.style.backgroundColor = '#c5a869';
                btn.style.color = '#000';
            } else {
                btn.style.backgroundColor = '#444';
                btn.style.color = '#fff';
            }
        });
        
        // Update breakpoint lines in grid overlay
        const breakpointLines = gridOverlay.querySelectorAll('[data-breakpoint]');
        breakpointLines.forEach(line => {
            const bp = parseInt(line.dataset.breakpoint);
            if (width > bp) {
                line.style.left = (bp / width * 100) + '%';
                line.style.display = 'block';
            } else {
                line.style.display = 'none';
            }
        });
    }
    
    // Update size on window resize
    window.addEventListener('resize', updateCurrentSize);
    
    // Initial update
    updateCurrentSize();
    
    console.log('Responsive testing tool initialized');
});
</content>