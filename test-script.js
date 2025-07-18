/**
 * Test script for comprehensive testing of the character sheet
 * Implements requirements for task 9.2: Perform comprehensive testing and bug fixes
 */
class CharacterSheetTester {
    constructor() {
        this.testResults = {
            passed: 0,
            failed: 0,
            total: 0
        };
        
        this.testLog = [];
    }
    
    /**
     * Run all tests
     */
    runAllTests() {
        console.log('Starting comprehensive character sheet tests...');
        
        // Test data persistence
        this.testDataPersistence();
        
        // Test stress trackers
        this.testStressTrackers();
        
        // Test resolve counter
        this.testResolveCounter();
        
        // Test talent system
        this.testTalentSystem();
        
        // Test momentum tracker
        this.testMomentumTracker();
        
        // Test accessibility features
        this.testAccessibilityFeatures();
        
        // Test responsive layout
        this.testResponsiveLayout();
        
        // Report results
        this.reportResults();
    }
    
    /**
     * Test data persistence
     */
    testDataPersistence() {
        this.logTest('Data Persistence Tests');
        
        // Test character data persistence
        try {
            // Set test data
            if (window.dataManager) {
                const testName = 'Test Character ' + Date.now();
                window.dataManager.characterData.characterName = testName;
                window.dataManager.saveCharacterData();
                
                // Reload data
                window.dataManager.loadCharacterData();
                
                // Verify data was saved correctly
                if (window.dataManager.characterData.characterName === testName) {
                    this.passTest('Character data persistence');
                } else {
                    this.failTest('Character data persistence', 'Character name not saved correctly');
                }
            } else {
                this.failTest('Character data persistence', 'Data manager not initialized');
            }
        } catch (error) {
            this.failTest('Character data persistence', error.message);
        }
        
        // Test tracker states persistence
        try {
            if (window.dataManager) {
                // Set test data
                const testValue = !window.dataManager.trackerStates.physicalStress[0];
                window.dataManager.trackerStates.physicalStress[0] = testValue;
                window.dataManager.saveTrackerStates();
                
                // Reload data
                window.dataManager.loadTrackerStates();
                
                // Verify data was saved correctly
                if (window.dataManager.trackerStates.physicalStress[0] === testValue) {
                    this.passTest('Tracker states persistence');
                } else {
                    this.failTest('Tracker states persistence', 'Physical stress not saved correctly');
                }
            } else {
                this.failTest('Tracker states persistence', 'Data manager not initialized');
            }
        } catch (error) {
            this.failTest('Tracker states persistence', error.message);
        }
        
        // Test talent data persistence
        try {
            if (window.dataManager) {
                // Set test data
                const testName = 'Test Talent ' + Date.now();
                window.dataManager.talentData.talents[0].name = testName;
                window.dataManager.saveTalentData();
                
                // Reload data
                window.dataManager.loadTalentData();
                
                // Verify data was saved correctly
                if (window.dataManager.talentData.talents[0].name === testName) {
                    this.passTest('Talent data persistence');
                } else {
                    this.failTest('Talent data persistence', 'Talent name not saved correctly');
                }
            } else {
                this.failTest('Talent data persistence', 'Data manager not initialized');
            }
        } catch (error) {
            this.failTest('Talent data persistence', error.message);
        }
    }
    
    /**
     * Test stress trackers
     */
    testStressTrackers() {
        this.logTest('Stress Tracker Tests');
        
        // Test physical stress tracker
        try {
            const physicalTracker = document.querySelector('.tracker-circles[data-tracker-type="physical"]');
            if (physicalTracker) {
                const firstPoint = physicalTracker.querySelector('.circle');
                if (firstPoint) {
                    // Test click functionality
                    const initialState = firstPoint.classList.contains('filled');
                    firstPoint.click();
                    const newState = firstPoint.classList.contains('filled');
                    
                    if (initialState !== newState) {
                        this.passTest('Physical stress tracker click');
                    } else {
                        this.failTest('Physical stress tracker click', 'Click did not toggle state');
                    }
                    
                    // Reset to initial state
                    if (initialState !== newState) {
                        firstPoint.click();
                    }
                } else {
                    this.failTest('Physical stress tracker', 'No stress points found');
                }
            } else {
                this.failTest('Physical stress tracker', 'Physical tracker not found');
            }
        } catch (error) {
            this.failTest('Physical stress tracker', error.message);
        }
        
        // Test mental stress tracker
        try {
            const mentalTracker = document.querySelector('.tracker-circles[data-tracker-type="mental"]');
            if (mentalTracker) {
                const firstPoint = mentalTracker.querySelector('.circle');
                if (firstPoint) {
                    // Test click functionality
                    const initialState = firstPoint.classList.contains('filled');
                    firstPoint.click();
                    const newState = firstPoint.classList.contains('filled');
                    
                    if (initialState !== newState) {
                        this.passTest('Mental stress tracker click');
                    } else {
                        this.failTest('Mental stress tracker click', 'Click did not toggle state');
                    }
                    
                    // Reset to initial state
                    if (initialState !== newState) {
                        firstPoint.click();
                    }
                } else {
                    this.failTest('Mental stress tracker', 'No stress points found');
                }
            } else {
                this.failTest('Mental stress tracker', 'Mental tracker not found');
            }
        } catch (error) {
            this.failTest('Mental stress tracker', error.message);
        }
    }
    
    /**
     * Test resolve counter
     */
    testResolveCounter() {
        this.logTest('Resolve Counter Tests');
        
        try {
            const resolveCounter = document.querySelector('.resolve-counter');
            if (resolveCounter) {
                const resolveValue = resolveCounter.querySelector('.resolve-value');
                const incrementBtn = resolveCounter.querySelector('.resolve-btn:last-child');
                
                if (resolveValue && incrementBtn) {
                    // Get initial value
                    const initialValue = parseInt(resolveValue.textContent);
                    
                    // Test increment functionality
                    incrementBtn.click();
                    const newValue = parseInt(resolveValue.textContent);
                    
                    if (newValue === initialValue + 1) {
                        this.passTest('Resolve counter increment');
                    } else {
                        this.failTest('Resolve counter increment', `Expected ${initialValue + 1}, got ${newValue}`);
                    }
                    
                    // Reset to initial value
                    const decrementBtn = resolveCounter.querySelector('.resolve-btn:first-child');
                    if (decrementBtn) {
                        decrementBtn.click();
                    }
                } else {
                    this.failTest('Resolve counter', 'Resolve value or increment button not found');
                }
            } else {
                this.failTest('Resolve counter', 'Resolve counter not found');
            }
        } catch (error) {
            this.failTest('Resolve counter', error.message);
        }
    }
    
    /**
     * Test talent system
     */
    testTalentSystem() {
        this.logTest('Talent System Tests');
        
        try {
            const talentSlot = document.querySelector('.talent-slot');
            if (talentSlot) {
                const nameInput = talentSlot.querySelector('.talent-name');
                const tagInput = talentSlot.querySelector('.talent-tag');
                const descriptionInput = talentSlot.querySelector('.talent-description');
                
                if (nameInput && tagInput && descriptionInput) {
                    // Test name input
                    const testName = 'Test Talent ' + Date.now();
                    nameInput.value = testName;
                    nameInput.dispatchEvent(new Event('input'));
                    
                    // Check if talent slot gets 'filled' class
                    if (talentSlot.classList.contains('filled')) {
                        this.passTest('Talent slot filled state');
                    } else {
                        this.failTest('Talent slot filled state', 'Talent slot not marked as filled');
                    }
                    
                    // Test tag input
                    const testTag = 'Test Tag';
                    tagInput.value = testTag;
                    tagInput.dispatchEvent(new Event('input'));
                    
                    // Test description input
                    const testDescription = 'Test Description';
                    descriptionInput.value = testDescription;
                    descriptionInput.dispatchEvent(new Event('input'));
                    
                    // Check if data is saved in talent manager
                    if (window.talentManager) {
                        const talentData = window.talentManager.getTalentData();
                        if (talentData.talents[0].name === testName) {
                            this.passTest('Talent name saved');
                        } else {
                            this.failTest('Talent name saved', `Expected ${testName}, got ${talentData.talents[0].name}`);
                        }
                        
                        if (talentData.talents[0].tag === testTag) {
                            this.passTest('Talent tag saved');
                        } else {
                            this.failTest('Talent tag saved', `Expected ${testTag}, got ${talentData.talents[0].tag}`);
                        }
                        
                        if (talentData.talents[0].description === testDescription) {
                            this.passTest('Talent description saved');
                        } else {
                            this.failTest('Talent description saved', `Expected ${testDescription}, got ${talentData.talents[0].description}`);
                        }
                    } else {
                        this.failTest('Talent manager', 'Talent manager not initialized');
                    }
                    
                    // Reset talent data
                    nameInput.value = '';
                    nameInput.dispatchEvent(new Event('input'));
                    tagInput.value = '';
                    tagInput.dispatchEvent(new Event('input'));
                    descriptionInput.value = '';
                    descriptionInput.dispatchEvent(new Event('input'));
                } else {
                    this.failTest('Talent inputs', 'Talent inputs not found');
                }
            } else {
                this.failTest('Talent slot', 'Talent slot not found');
            }
        } catch (error) {
            this.failTest('Talent system', error.message);
        }
    }
    
    /**
     * Test momentum tracker
     */
    testMomentumTracker() {
        this.logTest('Momentum Tracker Tests');
        
        try {
            const momentumTracker = document.querySelector('.momentum-tracker');
            if (momentumTracker) {
                const firstPoint = momentumTracker.querySelector('.momentum-point');
                if (firstPoint) {
                    // Test click functionality
                    const initialState = firstPoint.classList.contains('filled');
                    firstPoint.click();
                    const newState = firstPoint.classList.contains('filled');
                    
                    if (initialState !== newState) {
                        this.passTest('Momentum point click');
                    } else {
                        this.failTest('Momentum point click', 'Click did not toggle state');
                    }
                    
                    // Check if data is saved in talent manager
                    if (window.talentManager) {
                        const talentData = window.talentManager.getTalentData();
                        if (talentData.momentum[0] === newState) {
                            this.passTest('Momentum state saved');
                        } else {
                            this.failTest('Momentum state saved', `Expected ${newState}, got ${talentData.momentum[0]}`);
                        }
                    } else {
                        this.failTest('Talent manager', 'Talent manager not initialized');
                    }
                    
                    // Reset to initial state
                    if (initialState !== newState) {
                        firstPoint.click();
                    }
                } else {
                    this.failTest('Momentum tracker', 'No momentum points found');
                }
            } else {
                this.failTest('Momentum tracker', 'Momentum tracker not found');
            }
        } catch (error) {
            this.failTest('Momentum tracker', error.message);
        }
    }
    
    /**
     * Test accessibility features
     */
    testAccessibilityFeatures() {
        this.logTest('Accessibility Tests');
        
        // Test ARIA attributes on stress trackers
        try {
            const physicalTracker = document.querySelector('.tracker-circles[data-tracker-type="physical"]');
            if (physicalTracker) {
                const firstPoint = physicalTracker.querySelector('.circle');
                if (firstPoint) {
                    if (firstPoint.getAttribute('role') === 'checkbox') {
                        this.passTest('Stress point role attribute');
                    } else {
                        this.failTest('Stress point role attribute', 'Role attribute not set to checkbox');
                    }
                    
                    if (firstPoint.hasAttribute('aria-checked')) {
                        this.passTest('Stress point aria-checked attribute');
                    } else {
                        this.failTest('Stress point aria-checked attribute', 'aria-checked attribute not set');
                    }
                    
                    if (firstPoint.hasAttribute('tabindex')) {
                        this.passTest('Stress point tabindex attribute');
                    } else {
                        this.failTest('Stress point tabindex attribute', 'tabindex attribute not set');
                    }
                } else {
                    this.failTest('Stress point', 'No stress points found');
                }
            } else {
                this.failTest('Physical tracker', 'Physical tracker not found');
            }
        } catch (error) {
            this.failTest('Accessibility - stress trackers', error.message);
        }
        
        // Test ARIA attributes on resolve counter
        try {
            const resolveCounter = document.querySelector('.resolve-counter');
            if (resolveCounter) {
                if (resolveCounter.getAttribute('role') === 'spinbutton') {
                    this.passTest('Resolve counter role attribute');
                } else {
                    this.failTest('Resolve counter role attribute', 'Role attribute not set to spinbutton');
                }
                
                if (resolveCounter.hasAttribute('aria-valuenow')) {
                    this.passTest('Resolve counter aria-valuenow attribute');
                } else {
                    this.failTest('Resolve counter aria-valuenow attribute', 'aria-valuenow attribute not set');
                }
            } else {
                this.failTest('Resolve counter', 'Resolve counter not found');
            }
        } catch (error) {
            this.failTest('Accessibility - resolve counter', error.message);
        }
        
        // Test ARIA attributes on talent slots
        try {
            const talentSlot = document.querySelector('.talent-slot');
            if (talentSlot) {
                if (talentSlot.hasAttribute('tabindex')) {
                    this.passTest('Talent slot tabindex attribute');
                } else {
                    this.failTest('Talent slot tabindex attribute', 'tabindex attribute not set');
                }
                
                const nameInput = talentSlot.querySelector('.talent-name');
                if (nameInput && nameInput.hasAttribute('aria-label')) {
                    this.passTest('Talent name input aria-label attribute');
                } else {
                    this.failTest('Talent name input aria-label attribute', 'aria-label attribute not set');
                }
            } else {
                this.failTest('Talent slot', 'Talent slot not found');
            }
        } catch (error) {
            this.failTest('Accessibility - talent slots', error.message);
        }
    }
    
    /**
     * Test responsive layout
     */
    testResponsiveLayout() {
        this.logTest('Responsive Layout Tests');
        
        // Test grid layout
        try {
            const mainContent = document.querySelector('.main-content');
            if (mainContent) {
                const computedStyle = window.getComputedStyle(mainContent);
                const display = computedStyle.getPropertyValue('display');
                
                if (display === 'grid') {
                    this.passTest('Main content grid layout');
                } else {
                    this.failTest('Main content grid layout', `Expected display: grid, got display: ${display}`);
                }
                
                const gridTemplateAreas = computedStyle.getPropertyValue('grid-template-areas');
                if (gridTemplateAreas) {
                    this.passTest('Grid template areas defined');
                } else {
                    this.failTest('Grid template areas defined', 'No grid template areas defined');
                }
            } else {
                this.failTest('Main content', 'Main content element not found');
            }
        } catch (error) {
            this.failTest('Responsive layout - grid', error.message);
        }
        
        // Test talent section grid placement
        try {
            const talentsSection = document.querySelector('.talents-section');
            if (talentsSection) {
                const computedStyle = window.getComputedStyle(talentsSection);
                const gridArea = computedStyle.getPropertyValue('grid-area');
                
                if (gridArea === 'talents') {
                    this.passTest('Talents section grid area');
                } else {
                    this.failTest('Talents section grid area', `Expected grid-area: talents, got grid-area: ${gridArea}`);
                }
            } else {
                this.failTest('Talents section', 'Talents section not found');
            }
        } catch (error) {
            this.failTest('Responsive layout - talents section', error.message);
        }
    }
    
    /**
     * Log a test section
     * @param {string} section - The test section name
     */
    logTest(section) {
        console.log(`\n--- ${section} ---`);
        this.testLog.push(`\n--- ${section} ---`);
    }
    
    /**
     * Mark a test as passed
     * @param {string} test - The test name
     */
    passTest(test) {
        console.log(`✅ PASS: ${test}`);
        this.testLog.push(`✅ PASS: ${test}`);
        this.testResults.passed++;
        this.testResults.total++;
    }
    
    /**
     * Mark a test as failed
     * @param {string} test - The test name
     * @param {string} reason - The reason for failure
     */
    failTest(test, reason) {
        console.log(`❌ FAIL: ${test} - ${reason}`);
        this.testLog.push(`❌ FAIL: ${test} - ${reason}`);
        this.testResults.failed++;
        this.testResults.total++;
    }
    
    /**
     * Report test results
     */
    reportResults() {
        console.log('\n--- Test Results ---');
        console.log(`Total tests: ${this.testResults.total}`);
        console.log(`Passed: ${this.testResults.passed}`);
        console.log(`Failed: ${this.testResults.failed}`);
        console.log(`Pass rate: ${Math.round((this.testResults.passed / this.testResults.total) * 100)}%`);
        
        // Create a test report element
        const reportElement = document.createElement('div');
        reportElement.id = 'test-report';
        reportElement.style.position = 'fixed';
        reportElement.style.top = '10px';
        reportElement.style.right = '10px';
        reportElement.style.padding = '10px';
        reportElement.style.backgroundColor = '#333';
        reportElement.style.color = '#fff';
        reportElement.style.border = '1px solid #666';
        reportElement.style.borderRadius = '5px';
        reportElement.style.zIndex = '9999';
        reportElement.style.maxHeight = '80vh';
        reportElement.style.overflowY = 'auto';
        reportElement.style.maxWidth = '400px';
        
        // Add test results
        const resultsElement = document.createElement('div');
        resultsElement.innerHTML = `
            <h3>Test Results</h3>
            <p>Total tests: ${this.testResults.total}</p>
            <p>Passed: <span style="color: #4caf50;">${this.testResults.passed}</span></p>
            <p>Failed: <span style="color: #f44336;">${this.testResults.failed}</span></p>
            <p>Pass rate: ${Math.round((this.testResults.passed / this.testResults.total) * 100)}%</p>
            <button id="close-report" style="padding: 5px 10px; background-color: #666; color: #fff; border: none; border-radius: 3px; cursor: pointer;">Close</button>
            <button id="toggle-details" style="padding: 5px 10px; background-color: #666; color: #fff; border: none; border-radius: 3px; cursor: pointer; margin-left: 5px;">Show Details</button>
        `;
        reportElement.appendChild(resultsElement);
        
        // Add test log
        const logElement = document.createElement('div');
        logElement.id = 'test-log';
        logElement.style.display = 'none';
        logElement.style.marginTop = '10px';
        logElement.style.paddingTop = '10px';
        logElement.style.borderTop = '1px solid #666';
        logElement.innerHTML = this.testLog.join('<br>');
        reportElement.appendChild(logElement);
        
        // Add to document
        document.body.appendChild(reportElement);
        
        // Add event listeners
        document.getElementById('close-report').addEventListener('click', () => {
            document.body.removeChild(reportElement);
        });
        
        document.getElementById('toggle-details').addEventListener('click', () => {
            const logElement = document.getElementById('test-log');
            const toggleButton = document.getElementById('toggle-details');
            
            if (logElement.style.display === 'none') {
                logElement.style.display = 'block';
                toggleButton.textContent = 'Hide Details';
            } else {
                logElement.style.display = 'none';
                toggleButton.textContent = 'Show Details';
            }
        });
    }
}

// Run tests when the page is fully loaded
window.addEventListener('load', function() {
    // Wait a bit to ensure all components are initialized
    setTimeout(() => {
        const tester = new CharacterSheetTester();
        tester.runAllTests();
    }, 1000);
});