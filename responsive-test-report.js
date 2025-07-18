/**
 * Wheel of Fate Character Sheet - Responsive Testing Report Generator
 * This script analyzes the character sheet's responsive behavior and generates a report
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing responsive testing report generator...');
    
    // Create report container
    const reportContainer = document.createElement('div');
    reportContainer.id = 'responsive-test-report';
    reportContainer.style.position = 'fixed';
    reportContainer.style.top = '50px';
    reportContainer.style.left = '10px';
    reportContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    reportContainer.style.color = '#fff';
    reportContainer.style.padding = '15px';
    reportContainer.style.borderRadius = '5px';
    reportContainer.style.zIndex = '9998';
    reportContainer.style.maxWidth = '400px';
    reportContainer.style.maxHeight = '80vh';
    reportContainer.style.overflow = 'auto';
    reportContainer.style.fontFamily = 'Arial, sans-serif';
    reportContainer.style.fontSize = '14px';
    reportContainer.style.display = 'none'; // Hidden by default
    reportContainer.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.7)';
    
    // Add toggle button
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Show Responsive Report';
    toggleButton.style.position = 'fixed';
    toggleButton.style.top = '10px';
    toggleButton.style.left = '10px';
    toggleButton.style.zIndex = '9999';
    toggleButton.style.padding = '5px 10px';
    toggleButton.style.backgroundColor = '#32a852'; // Green
    toggleButton.style.color = '#fff';
    toggleButton.style.border = 'none';
    toggleButton.style.borderRadius = '3px';
    toggleButton.style.cursor = 'pointer';
    toggleButton.style.fontFamily = 'Arial, sans-serif';
    toggleButton.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.3)';
    
    document.body.appendChild(reportContainer);
    document.body.appendChild(toggleButton);
    
    // Toggle report visibility
    toggleButton.addEventListener('click', function() {
        if (reportContainer.style.display === 'none') {
            reportContainer.style.display = 'block';
            toggleButton.textContent = 'Hide Responsive Report';
            generateReport();
        } else {
            reportContainer.style.display = 'none';
            toggleButton.textContent = 'Show Responsive Report';
        }
    });
    
    // Define breakpoints to test
    const breakpoints = [
        { name: 'Desktop Large', width: 1920, height: 1080 },
        { name: 'Desktop', width: 1366, height: 768 },
        { name: 'Tablet Landscape', width: 1024, height: 768 },
        { name: 'Tablet Portrait', width: 768, height: 1024 },
        { name: 'Mobile Landscape', width: 640, height: 360 },
        { name: 'Mobile Portrait', width: 360, height: 640 }
    ];
    
    // Define elements to test
    const elementsToTest = [
        { selector: '.character-sheet', name: 'Character Sheet Container' },
        { selector: '.main-content', name: 'Main Content Grid' },
        { selector: '.distinctions-section', name: 'Distinctions Section' },
        { selector: '.values-section', name: 'Values Section' },
        { selector: '.approaches-section', name: 'Approaches Section' },
        { selector: '.trackers-section', name: 'Trackers Section' },
        { selector: '.roles-section', name: 'Roles Section' },
        { selector: '.talents-section', name: 'Talents Section' },
        { selector: '.notes-section', name: 'Notes Section' },
        { selector: '.character-details', name: 'Character Details' },
        { selector: '.trait-item', name: 'Trait Items' },
        { selector: '.distinction-item', name: 'Distinction Items' },
        { selector: '.roles-list', name: 'Roles List' }
    ];
    
    // Generate the report
    function generateReport() {
        reportContainer.innerHTML = '<h2 style="text-align: center; margin-top: 0; color: #c5a869;">Responsive Design Report</h2>';
        
        // Add current viewport info
        const currentViewport = document.createElement('div');
        currentViewport.style.marginBottom = '20px';
        currentViewport.style.padding = '10px';
        currentViewport.style.backgroundColor = 'rgba(50, 50, 50, 0.5)';
        currentViewport.style.borderRadius = '3px';
        
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        currentViewport.innerHTML = `
            <h3 style="margin-top: 0; margin-bottom: 10px; color: #c5a869;">Current Viewport</h3>
            <p style="margin: 0;">Width: ${viewportWidth}px</p>
            <p style="margin: 0;">Height: ${viewportHeight}px</p>
            <p style="margin: 5px 0 0 0; font-style: italic; color: #aaa;">
                ${getBreakpointCategory(viewportWidth)}
            </p>
        `;
        
        reportContainer.appendChild(currentViewport);
        
        // Add breakpoint analysis
        const breakpointAnalysis = document.createElement('div');
        breakpointAnalysis.style.marginBottom = '20px';
        
        breakpointAnalysis.innerHTML = `
            <h3 style="margin-top: 0; margin-bottom: 10px; color: #c5a869;">Breakpoint Analysis</h3>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <th style="text-align: left; padding: 5px; border-bottom: 1px solid #444;">Breakpoint</th>
                    <th style="text-align: center; padding: 5px; border-bottom: 1px solid #444;">Status</th>
                </tr>
                <tr>
                    <td style="padding: 5px; border-bottom: 1px solid #333;">Desktop (>1200px)</td>
                    <td style="text-align: center; padding: 5px; border-bottom: 1px solid #333; color: ${viewportWidth > 1200 ? '#4CAF50' : '#aaa'};">
                        ${viewportWidth > 1200 ? '✓ Active' : 'Inactive'}
                    </td>
                </tr>
                <tr>
                    <td style="padding: 5px; border-bottom: 1px solid #333;">Tablet (768px-1200px)</td>
                    <td style="text-align: center; padding: 5px; border-bottom: 1px solid #333; color: ${viewportWidth <= 1200 && viewportWidth > 768 ? '#4CAF50' : '#aaa'};">
                        ${viewportWidth <= 1200 && viewportWidth > 768 ? '✓ Active' : 'Inactive'}
                    </td>
                </tr>
                <tr>
                    <td style="padding: 5px; border-bottom: 1px solid #333;">Mobile (<768px)</td>
                    <td style="text-align: center; padding: 5px; border-bottom: 1px solid #333; color: ${viewportWidth <= 768 ? '#4CAF50' : '#aaa'};">
                        ${viewportWidth <= 768 ? '✓ Active' : 'Inactive'}
                    </td>
                </tr>
            </table>
        `;
        
        reportContainer.appendChild(breakpointAnalysis);
        
        // Add layout analysis
        const layoutAnalysis = document.createElement('div');
        layoutAnalysis.style.marginBottom = '20px';
        
        layoutAnalysis.innerHTML = `
            <h3 style="margin-top: 0; margin-bottom: 10px; color: #c5a869;">Layout Analysis</h3>
        `;
        
        // Check grid layout
        const mainContent = document.querySelector('.main-content');
        const mainContentStyle = mainContent ? getComputedStyle(mainContent) : null;
        
        if (mainContent && mainContentStyle) {
            const gridColumns = mainContentStyle.gridTemplateColumns;
            const gridAreas = mainContentStyle.gridTemplateAreas;
            
            const gridAnalysis = document.createElement('div');
            gridAnalysis.style.marginBottom = '15px';
            gridAnalysis.style.padding = '10px';
            gridAnalysis.style.backgroundColor = 'rgba(50, 50, 50, 0.5)';
            gridAnalysis.style.borderRadius = '3px';
            
            gridAnalysis.innerHTML = `
                <h4 style="margin-top: 0; margin-bottom: 5px; color: #c5a869;">Grid Layout</h4>
                <p style="margin: 0 0 5px 0;"><strong>Columns:</strong> ${gridColumns || 'Not using CSS Grid'}</p>
                <p style="margin: 0;"><strong>Areas:</strong> ${gridAreas ? 'Using named grid areas' : 'Not using named grid areas'}</p>
            `;
            
            layoutAnalysis.appendChild(gridAnalysis);
        }
        
        // Check responsive behavior of key elements
        elementsToTest.forEach(element => {
            const elements = document.querySelectorAll(element.selector);
            if (elements.length > 0) {
                const firstElement = elements[0];
                const style = getComputedStyle(firstElement);
                
                const elementAnalysis = document.createElement('div');
                elementAnalysis.style.marginBottom = '10px';
                elementAnalysis.style.padding = '10px';
                elementAnalysis.style.backgroundColor = 'rgba(50, 50, 50, 0.5)';
                elementAnalysis.style.borderRadius = '3px';
                
                elementAnalysis.innerHTML = `
                    <h4 style="margin-top: 0; margin-bottom: 5px; color: #c5a869;">${element.name}</h4>
                    <p style="margin: 0 0 3px 0;"><strong>Display:</strong> ${style.display}</p>
                    <p style="margin: 0 0 3px 0;"><strong>Width:</strong> ${style.width}</p>
                    <p style="margin: 0;"><strong>Position:</strong> ${style.position}</p>
                `;
                
                layoutAnalysis.appendChild(elementAnalysis);
            }
        });
        
        reportContainer.appendChild(layoutAnalysis);
        
        // Add recommendations
        const recommendations = document.createElement('div');
        recommendations.style.marginBottom = '20px';
        
        recommendations.innerHTML = `
            <h3 style="margin-top: 0; margin-bottom: 10px; color: #c5a869;">Recommendations</h3>
            <ul style="margin: 0; padding-left: 20px;">
                ${generateRecommendations()}
            </ul>
        `;
        
        reportContainer.appendChild(recommendations);
        
        // Add test buttons
        const testButtons = document.createElement('div');
        testButtons.style.marginBottom = '20px';
        
        testButtons.innerHTML = `
            <h3 style="margin-top: 0; margin-bottom: 10px; color: #c5a869;">Test at Common Breakpoints</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 5px;">
                ${breakpoints.map(bp => `
                    <button class="test-breakpoint-btn" data-width="${bp.width}" data-height="${bp.height}" 
                        style="flex: 1 0 calc(50% - 5px); padding: 8px; background: #444; color: #fff; border: 1px solid #666; cursor: pointer; border-radius: 3px;">
                        ${bp.name}<br>${bp.width}×${bp.height}
                    </button>
                `).join('')}
            </div>
        `;
        
        reportContainer.appendChild(testButtons);
        
        // Add event listeners to test buttons
        document.querySelectorAll('.test-breakpoint-btn').forEach(button => {
            button.addEventListener('click', function() {
                const width = parseInt(this.dataset.width);
                const height = parseInt(this.dataset.height);
                
                // Create a popup window with the specified dimensions
                const popup = window.open(window.location.href, 'responsiveTest', 
                    `width=${width},height=${height},resizable=yes,scrollbars=yes,status=yes`);
                
                if (popup) {
                    popup.resizeTo(width, height);
                    popup.focus();
                } else {
                    alert('Please allow popups for this site to test different screen sizes.');
                }
            });
        });
        
        // Add export button
        const exportButton = document.createElement('button');
        exportButton.textContent = 'Export Report';
        exportButton.style.width = '100%';
        exportButton.style.padding = '10px';
        exportButton.style.backgroundColor = '#c5a869';
        exportButton.style.color = '#000';
        exportButton.style.border = 'none';
        exportButton.style.borderRadius = '3px';
        exportButton.style.cursor = 'pointer';
        exportButton.style.marginTop = '10px';
        exportButton.style.fontWeight = 'bold';
        
        exportButton.addEventListener('click', function() {
            exportReport();
        });
        
        reportContainer.appendChild(exportButton);
    }
    
    // Helper function to get breakpoint category
    function getBreakpointCategory(width) {
        if (width > 1200) return 'Desktop Layout (3-column grid)';
        if (width > 768) return 'Tablet Layout (2-column grid)';
        return 'Mobile Layout (1-column grid)';
    }
    
    // Generate recommendations based on current viewport
    function generateRecommendations() {
        const width = window.innerWidth;
        const recommendations = [];
        
        // Check for potential issues based on viewport width
        if (width <= 480) {
            // Mobile portrait recommendations
            recommendations.push('Consider further reducing padding and margins for very small screens');
            recommendations.push('Ensure touch targets (buttons, selectors) are at least 44×44px');
            recommendations.push('Test input field usability on small touch screens');
        } else if (width <= 768) {
            // Mobile landscape / small tablet recommendations
            recommendations.push('Ensure trait items stack properly on narrow screens');
            recommendations.push('Check that dice ratings remain accessible and tappable');
            recommendations.push('Verify that all text remains readable at this size');
        } else if (width <= 1200) {
            // Tablet recommendations
            recommendations.push('Verify that the 2-column layout provides good content organization');
            recommendations.push('Check that the talents section displays properly when moved below');
            recommendations.push('Ensure roles section adapts well to the medium width');
        } else {
            // Desktop recommendations
            recommendations.push('Ensure the 3-column layout makes efficient use of space');
            recommendations.push('Verify that the character sheet doesn\'t become too wide on very large screens');
            recommendations.push('Consider max-width constraints for better readability on wide screens');
        }
        
        // Check for specific elements
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            const style = getComputedStyle(mainContent);
            if (style.display !== 'grid') {
                recommendations.push('Main content grid may be falling back to non-grid layout in this browser');
            }
        }
        
        // Check for flex gap support
        const characterDetails = document.querySelector('.character-details');
        if (characterDetails) {
            const style = getComputedStyle(characterDetails);
            if (style.display === 'flex' && !style.gap) {
                recommendations.push('Flexbox gap property may not be supported in this browser, check spacing');
            }
        }
        
        // Format recommendations as HTML list items
        return recommendations.map(rec => `<li style="margin-bottom: 5px;">${rec}</li>`).join('');
    }
    
    // Export report as HTML file
    function exportReport() {
        const reportContent = reportContainer.innerHTML;
        const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Wheel of Fate Character Sheet - Responsive Test Report</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 20px;
                    }
                    h1, h2, h3, h4 {
                        color: #8c7853;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 20px;
                    }
                    th, td {
                        padding: 8px;
                        text-align: left;
                        border-bottom: 1px solid #ddd;
                    }
                    th {
                        background-color: #f2f2f2;
                    }
                    .section {
                        margin-bottom: 30px;
                        padding: 15px;
                        background-color: #f9f9f9;
                        border-radius: 5px;
                    }
                    .timestamp {
                        color: #666;
                        font-style: italic;
                    }
                </style>
            </head>
            <body>
                <h1>Wheel of Fate Character Sheet - Responsive Test Report</h1>
                <p class="timestamp">Generated on ${new Date().toLocaleString()}</p>
                <div class="section">
                    ${reportContent}
                </div>
            </body>
            </html>
        `;
        
        // Create a blob and download link
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'responsive-test-report.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
});
