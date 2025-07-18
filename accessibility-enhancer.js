/**
 * Accessibility Enhancer for Wheel of Fate Character Sheet
 * Improves keyboard navigation, screen reader support, and other accessibility features
 */

document.addEventListener('DOMContentLoaded', function() {
    enhanceAccessibility();
});

function enhanceAccessibility() {
    // Enhance keyboard navigation for interactive elements
    enhanceKeyboardNavigation();
    
    // Improve screen reader announcements
    improveScreenReaderSupport();
    
    // Add high contrast mode toggle
    addHighContrastModeToggle();
    
    // Add font size adjustment
    addFontSizeAdjustment();
}

function enhanceKeyboardNavigation() {
    // Make tracker circles keyboard navigable
    const circles = document.querySelectorAll('.circle');
    circles.forEach(circle => {
        // Add keyboard event listener
        circle.addEventListener('keydown', function(e) {
            // Toggle on Enter or Space
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleCircle(this);
                
                // Update ARIA state
                const isChecked = this.classList.contains('filled');
                this.setAttribute('aria-checked', isChecked);
            }
        });
        
        // Add click event that also updates ARIA state
        circle.addEventListener('click', function() {
            const isChecked = this.classList.contains('filled');
            this.setAttribute('aria-checked', isChecked);
        });
    });
    
    // Make resolve counter keyboard navigable
    const resolveCounter = document.querySelector('.resolve-counter');
    if (resolveCounter) {
        resolveCounter.addEventListener('keydown', function(e) {
            const value = parseInt(document.querySelector('.resolve-value').textContent);
            
            if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
                e.preventDefault();
                incrementResolve();
                updateResolveAriaValue(value + 1);
            } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
                e.preventDefault();
                decrementResolve();
                updateResolveAriaValue(value - 1);
            }
        });
    }
    
    // Enhance talent slots for keyboard navigation
    const talentSlots = document.querySelectorAll('.talent-slot');
    talentSlots.forEach(slot => {
        slot.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                // Focus on the first input in the talent slot
                const firstInput = this.querySelector('input');
                if (firstInput) firstInput.focus();
            }
        });
    });
}

function improveScreenReaderSupport() {
    // Add descriptive labels to sections
    document.querySelectorAll('.trait-box').forEach(box => {
        const heading = box.querySelector('h2');
        if (heading) {
            const sectionName = heading.textContent.trim();
            box.setAttribute('aria-label', `${sectionName} section`);
            box.setAttribute('role', 'region');
        }
    });
    
    // Add live region for dynamic content
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'accessibility-announcer';
    document.body.appendChild(liveRegion);
    
    // Add descriptions to dice ratings
    document.querySelectorAll('.dice-rating').forEach(select => {
        const parentElement = select.closest('.trait-item, .distinction-item, .approach-item, .role-item');
        if (parentElement) {
            let traitName = '';
            
            // Try to find the name based on context
            const nameElement = parentElement.querySelector('.trait-name, .distinction-input, .approach-name, .role-name');
            if (nameElement) {
                traitName = nameElement.textContent || nameElement.value || '';
            }
            
            if (traitName) {
                select.setAttribute('aria-label', `${traitName} dice rating`);
            }
        }
    });
}

function addHighContrastModeToggle() {
    // Create high contrast mode toggle button
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'High Contrast';
    toggleButton.className = 'accessibility-toggle high-contrast-toggle';
    toggleButton.setAttribute('aria-pressed', 'false');
    toggleButton.setAttribute('aria-label', 'Toggle high contrast mode');
    
    toggleButton.addEventListener('click', function() {
        document.body.classList.toggle('high-contrast');
        const isHighContrast = document.body.classList.contains('high-contrast');
        this.setAttribute('aria-pressed', isHighContrast);
        
        // Announce change to screen readers
        announceToScreenReader(`High contrast mode ${isHighContrast ? 'enabled' : 'disabled'}`);
        
        // Save preference
        localStorage.setItem('highContrastMode', isHighContrast);
    });
    
    // Add to accessibility controls
    addToAccessibilityControls(toggleButton);
    
    // Check for saved preference
    if (localStorage.getItem('highContrastMode') === 'true') {
        document.body.classList.add('high-contrast');
        toggleButton.setAttribute('aria-pressed', 'true');
    }
    
    // Add high contrast styles
    addHighContrastStyles();
}

function addFontSizeAdjustment() {
    // Create font size controls
    const fontSizeControls = document.createElement('div');
    fontSizeControls.className = 'font-size-controls';
    
    const decreaseButton = document.createElement('button');
    decreaseButton.textContent = 'A-';
    decreaseButton.className = 'font-size-btn decrease';
    decreaseButton.setAttribute('aria-label', 'Decrease font size');
    
    const increaseButton = document.createElement('button');
    increaseButton.textContent = 'A+';
    increaseButton.className = 'font-size-btn increase';
    increaseButton.setAttribute('aria-label', 'Increase font size');
    
    // Add event listeners
    decreaseButton.addEventListener('click', function() {
        changeFontSize(-1);
    });
    
    increaseButton.addEventListener('click', function() {
        changeFontSize(1);
    });
    
    // Add to controls
    fontSizeControls.appendChild(decreaseButton);
    fontSizeControls.appendChild(increaseButton);
    addToAccessibilityControls(fontSizeControls);
    
    // Apply saved font size
    const savedFontSize = localStorage.getItem('fontSizeAdjustment');
    if (savedFontSize) {
        document.documentElement.style.setProperty('--font-size-adjustment', savedFontSize + '%');
    }
}

function addToAccessibilityControls(element) {
    // Create accessibility controls container if it doesn't exist
    let accessibilityControls = document.querySelector('.accessibility-controls');
    
    if (!accessibilityControls) {
        accessibilityControls = document.createElement('div');
        accessibilityControls.className = 'accessibility-controls';
        document.body.appendChild(accessibilityControls);
    }
    
    // Add the element
    accessibilityControls.appendChild(element);
}

function addHighContrastStyles() {
    // Create style element if it doesn't exist
    let highContrastStyle = document.getElementById('high-contrast-styles');
    
    if (!highContrastStyle) {
        highContrastStyle = document.createElement('style');
        highContrastStyle.id = 'high-contrast-styles';
        document.head.appendChild(highContrastStyle);
        
        // Add high contrast styles
        highContrastStyle.textContent = `
            .high-contrast {
                --color-bg: #000000;
                --color-header-bg: #000000;
                --color-text: #ffffff;
                --color-accent: #ffff00;
                --color-border: #ffffff;
            }
            
            .high-contrast .character-sheet {
                background-color: #000000;
                border: 3px solid #ffffff;
            }
            
            .high-contrast .trait-box {
                background-color: #000000;
                border: 2px solid #ffffff;
            }
            
            .high-contrast .circle {
                border: 2px solid #ffffff;
            }
            
            .high-contrast .circle.filled {
                background-color: #ffff00;
                border-color: #ffffff;
            }
            
            .high-contrast input, 
            .high-contrast textarea, 
            .high-contrast select {
                background-color: #000000;
                color: #ffffff;
                border-color: #ffffff;
            }
            
            .high-contrast .dice-rating {
                background-color: #000000;
                color: #ffff00;
            }
            
            .high-contrast .trait-name, 
            .high-contrast .approach-name, 
            .high-contrast .role-name {
                color: #ffff00;
            }
        `;
    }
}

function changeFontSize(direction) {
    // Get current font size adjustment
    let currentAdjustment = parseInt(localStorage.getItem('fontSizeAdjustment') || '100');
    
    // Adjust by 10% in the specified direction
    currentAdjustment += (direction * 10);
    
    // Limit to reasonable range (70% to 200%)
    currentAdjustment = Math.max(70, Math.min(200, currentAdjustment));
    
    // Apply and save
    document.documentElement.style.setProperty('--font-size-adjustment', currentAdjustment + '%');
    localStorage.setItem('fontSizeAdjustment', currentAdjustment);
    
    // Announce to screen readers
    announceToScreenReader(`Font size changed to ${currentAdjustment}%`);
}

function announceToScreenReader(message) {
    const announcer = document.getElementById('accessibility-announcer');
    if (announcer) {
        announcer.textContent = message;
    }
}

function toggleCircle(circle) {
    circle.classList.toggle('filled');
}

function incrementResolve() {
    const valueElement = document.querySelector('.resolve-value');
    let value = parseInt(valueElement.textContent);
    
    // Limit to max of 10
    if (value < 10) {
        value++;
        valueElement.textContent = value;
        
        // Update classes for styling
        updateResolveValueClasses(value);
    }
}

function decrementResolve() {
    const valueElement = document.querySelector('.resolve-value');
    let value = parseInt(valueElement.textContent);
    
    // Limit to min of 0
    if (value > 0) {
        value--;
        valueElement.textContent = value;
        
        // Update classes for styling
        updateResolveValueClasses(value);
    }
}

function updateResolveValueClasses(value) {
    const valueElement = document.querySelector('.resolve-value');
    
    // Remove existing state classes
    valueElement.classList.remove('min-value', 'max-value');
    
    // Add appropriate class
    if (value === 0) {
        valueElement.classList.add('min-value');
    } else if (value === 10) {
        valueElement.classList.add('max-value');
    }
}

function updateResolveAriaValue(value) {
    const resolveCounter = document.querySelector('.resolve-counter');
    if (resolveCounter) {
        resolveCounter.setAttribute('aria-valuenow', value);
    }
}