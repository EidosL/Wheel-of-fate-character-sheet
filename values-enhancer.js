/**
 * Values Enhancer for Wheel of Fate Character Sheet
 * Enhances the Values section with additional functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeValuesEnhancer();
});

function initializeValuesEnhancer() {
    // Add value statement suggestions
    addValueStatementSuggestions();
    
    // Add visual enhancements to values section
    enhanceValuesSection();
    
    // Add value conflict detection
    setupValueConflictDetection();
}

function addValueStatementSuggestions() {
    // Define value statement templates for each value
    const valueStatements = {
        'Faith': [
            'I believe in [deity/cause] above all else.',
            'My faith in [belief] guides my every action.',
            'I trust that [principle] will lead me to the right path.'
        ],
        'Justice': [
            'Everyone deserves a fair judgment, regardless of status.',
            'I will right the wrongs done to the innocent.',
            'The law must be upheld, but mercy has its place.'
        ],
        'Loyalty': [
            'I would die for those I have sworn to protect.',
            'My word, once given, is my bond forever.',
            'I never abandon those who depend on me.'
        ],
        'Kindness': [
            'A gentle word can change more than a sharp sword.',
            'I believe everyone deserves compassion and understanding.',
            'Helping others is its own reward.'
        ],
        'Liberty': [
            'Everyone deserves to choose their own path.',
            'Freedom is worth any price I must pay.',
            'Chains, whether physical or spiritual, must be broken.'
        ],
        'Power': [
            'Strength is necessary to protect what matters.',
            'Only through power can real change be achieved.',
            'I seek the strength to control my own destiny.'
        ]
    };
    
    // Add suggestion functionality to each value statement input
    document.querySelectorAll('.values-section .trait-item').forEach(item => {
        const valueName = item.querySelector('.trait-name').textContent;
        const statementInput = item.querySelector('.value-statement');
        
        if (statementInput && valueStatements[valueName]) {
            // Add suggestion button
            const suggestButton = document.createElement('button');
            suggestButton.className = 'value-suggest-btn';
            suggestButton.innerHTML = '💡';
            suggestButton.setAttribute('aria-label', `Suggest ${valueName} statements`);
            suggestButton.setAttribute('type', 'button');
            
            // Add suggestions dropdown
            const suggestionsDropdown = document.createElement('div');
            suggestionsDropdown.className = 'value-suggestions';
            
            // Add suggestions
            valueStatements[valueName].forEach(suggestion => {
                const suggestionItem = document.createElement('div');
                suggestionItem.className = 'suggestion-item';
                suggestionItem.textContent = suggestion;
                
                // Apply suggestion on click
                suggestionItem.addEventListener('click', function() {
                    statementInput.value = suggestion;
                    suggestionsDropdown.classList.remove('show');
                    
                    // Trigger input event to update any listeners
                    const event = new Event('input', { bubbles: true });
                    statementInput.dispatchEvent(event);
                });
                
                suggestionsDropdown.appendChild(suggestionItem);
            });
            
            // Show/hide suggestions
            suggestButton.addEventListener('click', function(e) {
                e.stopPropagation();
                suggestionsDropdown.classList.toggle('show');
            });
            
            // Hide suggestions when clicking elsewhere
            document.addEventListener('click', function() {
                suggestionsDropdown.classList.remove('show');
            });
            
            // Add to DOM
            item.insertBefore(suggestButton, statementInput.nextSibling);
            item.appendChild(suggestionsDropdown);
        }
    });
}

function enhanceValuesSection() {
    // Add visual indicator for value importance based on dice rating
    document.querySelectorAll('.values-section .trait-item').forEach(item => {
        const diceRating = item.querySelector('.dice-rating');
        const valueName = item.querySelector('.trait-name');
        
        if (diceRating && valueName) {
            // Update visual importance on load
            updateValueImportance(diceRating, valueName);
            
            // Update when rating changes
            diceRating.addEventListener('change', function() {
                updateValueImportance(this, valueName);
            });
        }
    });
    
    // Add value statement character counter
    document.querySelectorAll('.value-statement').forEach(input => {
        input.addEventListener('input', function() {
            updateStatementCounter(this);
        });
        
        // Initialize counter
        updateStatementCounter(input);
    });
}

function updateValueImportance(diceRating, valueElement) {
    // Remove existing importance classes
    valueElement.classList.remove('value-minor', 'value-moderate', 'value-major');
    
    // Add appropriate class based on dice rating
    const rating = diceRating.value;
    
    if (rating === 'd4' || rating === 'd6') {
        valueElement.classList.add('value-minor');
    } else if (rating === 'd8') {
        valueElement.classList.add('value-moderate');
    } else if (rating === 'd10' || rating === 'd12') {
        valueElement.classList.add('value-major');
    }
}

function updateStatementCounter(input) {
    // Get or create counter element
    let counter = input.nextElementSibling;
    if (!counter || !counter.classList.contains('statement-counter')) {
        counter = document.createElement('span');
        counter.className = 'statement-counter';
        input.parentNode.insertBefore(counter, input.nextSibling);
    }
    
    // Update counter
    const maxLength = 100; // Reasonable max length for a value statement
    const currentLength = input.value.length;
    counter.textContent = `${currentLength}/${maxLength}`;
    
    // Add warning class if approaching limit
    counter.classList.remove('counter-warning', 'counter-danger');
    
    if (currentLength > maxLength * 0.8) {
        counter.classList.add('counter-warning');
    }
    
    if (currentLength > maxLength * 0.95) {
        counter.classList.add('counter-danger');
    }
}

function setupValueConflictDetection() {
    // Add conflict detection when value statements change
    document.querySelectorAll('.value-statement').forEach(input => {
        input.addEventListener('blur', function() {
            detectValueConflicts();
        });
    });
}

function detectValueConflicts() {
    // Get all value statements
    const valueStatements = [];
    document.querySelectorAll('.values-section .trait-item').forEach(item => {
        const valueName = item.querySelector('.trait-name').textContent;
        const statement = item.querySelector('.value-statement').value;
        const rating = item.querySelector('.dice-rating').value;
        
        if (statement.trim() !== '') {
            valueStatements.push({
                name: valueName,
                statement: statement,
                rating: rating,
                element: item
            });
        }
    });
    
    // Clear existing conflict indicators
    document.querySelectorAll('.value-conflict-indicator').forEach(indicator => {
        indicator.remove();
    });
    
    // Check for potential conflicts between high-rated values
    const highValueStatements = valueStatements.filter(v => 
        v.rating === 'd10' || v.rating === 'd12'
    );
    
    // Simple conflict detection based on opposing keywords
    const opposingConcepts = [
        ['freedom', 'control'],
        ['order', 'chaos'],
        ['tradition', 'change'],
        ['loyalty', 'independence'],
        ['sacrifice', 'self-interest'],
        ['truth', 'deception'],
        ['mercy', 'justice']
    ];
    
    // Check each pair of high-rated values
    for (let i = 0; i < highValueStatements.length; i++) {
        for (let j = i + 1; j < highValueStatements.length; j++) {
            const value1 = highValueStatements[i];
            const value2 = highValueStatements[j];
            
            // Check for opposing concepts
            let conflict = false;
            
            opposingConcepts.forEach(pair => {
                const [concept1, concept2] = pair;
                
                if ((value1.statement.toLowerCase().includes(concept1) && 
                     value2.statement.toLowerCase().includes(concept2)) ||
                    (value1.statement.toLowerCase().includes(concept2) && 
                     value2.statement.toLowerCase().includes(concept1))) {
                    conflict = true;
                }
            });
            
            // If conflict found, add indicators
            if (conflict) {
                addConflictIndicator(value1.element, value2.name);
                addConflictIndicator(value2.element, value1.name);
            }
        }
    }
}

function addConflictIndicator(valueElement, conflictingValueName) {
    // Create conflict indicator
    const indicator = document.createElement('div');
    indicator.className = 'value-conflict-indicator';
    indicator.innerHTML = `⚠️ May conflict with <strong>${conflictingValueName}</strong>`;
    indicator.setAttribute('title', `This value statement may conflict with your ${conflictingValueName} value. This could create interesting roleplaying opportunities!`);
    
    // Add to value item
    valueElement.appendChild(indicator);
}

// Add CSS for values enhancer
document.addEventListener('DOMContentLoaded', function() {
    addValuesEnhancerStyles();
});

function addValuesEnhancerStyles() {
    // Create style element if it doesn't exist
    let valuesStyles = document.getElementById('values-enhancer-styles');
    
    if (!valuesStyles) {
        valuesStyles = document.createElement('style');
        valuesStyles.id = 'values-enhancer-styles';
        document.head.appendChild(valuesStyles);
        
        // Add values enhancer styles
        valuesStyles.textContent = `
            /* Value importance indicators */
            .trait-name.value-minor {
                color: #a0a0a0;
                font-weight: normal;
            }
            
            .trait-name.value-moderate {
                color: var(--color-accent);
                font-weight: bold;
            }
            
            .trait-name.value-major {
                color: var(--color-accent);
                font-weight: bold;
                text-shadow: 0 0 5px rgba(197, 168, 105, 0.5);
                position: relative;
            }
            
            .trait-name.value-major::after {
                content: '★';
                position: absolute;
                top: -5px;
                right: -15px;
                font-size: 0.8em;
                color: var(--color-accent);
            }
            
            /* Value suggestion button */
            .value-suggest-btn {
                background: none;
                border: none;
                font-size: 1.2em;
                cursor: pointer;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0.7;
                transition: opacity 0.2s;
            }
            
            .value-suggest-btn:hover {
                opacity: 1;
            }
            
            /* Value suggestions dropdown */
            .value-suggestions {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                background-color: var(--color-header-bg);
                border: 1px solid var(--color-border);
                border-radius: 4px;
                box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
                z-index: 10;
                display: none;
                flex-direction: column;
                width: 80%;
                max-width: 300px;
            }
            
            .value-suggestions.show {
                display: flex;
            }
            
            .suggestion-item {
                padding: 8px 12px;
                cursor: pointer;
                transition: background-color 0.2s;
                border-bottom: 1px solid rgba(140, 120, 83, 0.3);
            }
            
            .suggestion-item:last-child {
                border-bottom: none;
            }
            
            .suggestion-item:hover {
                background-color: rgba(197, 168, 105, 0.2);
            }
            
            /* Statement counter */
            .statement-counter {
                position: absolute;
                right: 60px;
                bottom: 5px;
                font-size: 0.8em;
                opacity: 0.7;
                color: var(--color-text);
            }
            
            .counter-warning {
                color: #e6c07b;
            }
            
            .counter-danger {
                color: #e74c3c;
            }
            
            /* Value conflict indicator */
            .value-conflict-indicator {
                margin-top: 5px;
                padding: 3px 8px;
                background-color: rgba(231, 76, 60, 0.2);
                border-left: 3px solid #e74c3c;
                font-size: 0.8em;
                color: #e0e0e0;
            }
            
            /* Make room for the counter */
            .value-statement {
                padding-right: 50px;
            }
        `;
    }
}