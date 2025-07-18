/**
 * Data Manager for Wheel of Fate Character Sheet
 * Handles saving, loading, and managing character data
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeDataManager();
});

function initializeDataManager() {
    setupAutoSave();
    loadCharacterData();
    setupExportImport();
}

function setupAutoSave() {
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('input', saveCharacterData); // Use 'input' for more responsive saving
        input.addEventListener('change', saveCharacterData);
    });

    const circles = document.querySelectorAll('.circle');
    circles.forEach(circle => {
        circle.addEventListener('click', saveCharacterData);
    });

    // Also save when resolve changes
    const resolveBtns = document.querySelectorAll('.resolve-btn');
    resolveBtns.forEach(btn => {
        btn.addEventListener('click', saveCharacterData);
    });
}

function saveCharacterData() {
    try {
        const characterData = {
            characterName: document.getElementById('character-name').value,
            playerName: document.getElementById('player-name').value,
            distinctions: getDistinctionsData(),
            values: getValuesData(),
            approaches: getApproachesData(),
            roles: getRolesData(),
            trackers: getTrackersData(),
            talents: getTalentsData(),
            notes: document.querySelector('.notes-area').value
        };
        localStorage.setItem('wheelOfFateCharacter', JSON.stringify(characterData));
        console.log('Character data saved successfully.');
    } catch (error) {
        console.error("Failed to save character data:", error);
        showNotification('Error saving character data.', 'error');
    }
}

function loadCharacterData() {
    const savedData = localStorage.getItem('wheelOfFateCharacter');
    if (!savedData) return;

    try {
        const characterData = JSON.parse(savedData);
        
        document.getElementById('character-name').value = characterData.characterName || '';
        document.getElementById('player-name').value = characterData.playerName || '';
        
        if (characterData.distinctions) loadDistinctionsData(characterData.distinctions);
        if (characterData.values) loadValuesData(characterData.values);
        if (characterData.approaches) loadApproachesData(characterData.approaches);
        if (characterData.roles) loadRolesData(characterData.roles);
        if (characterData.trackers) loadTrackersData(characterData.trackers);
        if (characterData.talents) loadTalentsData(characterData.talents);
        if (characterData.notes) document.querySelector('.notes-area').value = characterData.notes;

        // **FIX:** After loading data, manually trigger UI updates that don't happen automatically.
        // This ensures tracker titles have the correct color/glow.
        document.querySelectorAll('[data-tracker-type]').forEach(container => {
            const wrapperElement = container.closest('.tracker, .momentum-tracker');
            if (wrapperElement && typeof updateTrackerStyles === 'function') {
                updateTrackerStyles(wrapperElement, container);
            }
        });
        
        // Also update role specializations visuals
        document.querySelectorAll('.roles-list .role-item').forEach(item => {
            const diceRating = item.querySelector('.dice-rating');
             if (diceRating && typeof updateRoleSpecialization === 'function') {
                updateRoleSpecialization(diceRating, item);
            }
        });


    } catch (error) {
        console.error("Failed to load or parse character data:", error);
        localStorage.removeItem('wheelOfFateCharacter'); // Clear corrupted data
    }
}

// --- Data Getter Functions (Made more robust) ---

function getDistinctionsData() {
    const distinctions = [];
    document.querySelectorAll('.distinction-item').forEach(item => {
        const input = item.querySelector('.distinction-input');
        const select = item.querySelector('.dice-rating');
        const statement = item.querySelector('.distinction-statement');
        if (input && select && statement) {
            distinctions.push({
                name: input.value,
                rating: select.value,
                statement: statement.value
            });
        }
    });
    return distinctions;
}

function getValuesData() {
    const values = [];
    // FIX: Select the header directly, as its children are reliable.
    document.querySelectorAll('.values-section .value-header').forEach(header => {
        const name = header.querySelector('.trait-name')?.textContent;
        const rating = header.querySelector('.dice-rating')?.value;
        // The statement is in a sibling div
        const statement = header.nextElementSibling?.querySelector('.value-statement')?.value;

        if (name && rating !== undefined && statement !== undefined) {
            values.push({ name, rating, statement });
        }
    });
    return values;
}

function getApproachesData() {
    const approaches = [];
    document.querySelectorAll('.approaches-list .approach-item').forEach(item => {
        const name = item.querySelector('.approach-name')?.textContent;
        const rating = item.querySelector('.dice-rating')?.value;
        if (name && rating) {
            approaches.push({ name, rating });
        }
    });
    return approaches;
}

function getRolesData() {
    const roles = [];
     // FIX: Select the header directly as the layout is modified by JS.
    document.querySelectorAll('.roles-list .role-header').forEach(header => {
        const name = header.querySelector('.role-name')?.textContent;
        const rating = header.querySelector('.dice-rating')?.value;
        if (name && rating) {
            roles.push({ name, rating });
        }
    });
    return roles;
}

function getTrackersData() {
    const trackers = {
        physical: [],
        mental: [],
        resolve: document.querySelector('.resolve-value')?.textContent || '1',
        momentum: []
    };
    document.querySelectorAll('[data-tracker-type="physical"] .circle').forEach(c => trackers.physical.push(c.classList.contains('filled')));
    document.querySelectorAll('[data-tracker-type="mental"] .circle').forEach(c => trackers.mental.push(c.classList.contains('filled')));
    document.querySelectorAll('[data-tracker-type="momentum"] .circle').forEach(c => trackers.momentum.push(c.classList.contains('filled')));
    return trackers;
}

function getTalentsData() {
    const talents = [];
    document.querySelectorAll('.talent-slot').forEach(slot => {
        const name = slot.querySelector('.talent-name').value;
        const tag = slot.querySelector('.talent-tag').value;
        const description = slot.querySelector('.talent-description').value;
        talents.push({
            name, tag, description,
            filled: !!(name || tag || description)
        });
    });
    return talents;
}


// --- Data Loader Functions (Made more robust) ---

function loadDistinctionsData(distinctions) {
    const distinctionItems = document.querySelectorAll('.distinction-item');
    distinctions.forEach((data, index) => {
        if (index >= distinctionItems.length) return;
        const item = distinctionItems[index];
        item.querySelector('.distinction-input').value = data.name || '';
        item.querySelector('.dice-rating').value = data.rating || 'd8';
        item.querySelector('.distinction-statement').value = data.statement || '';
    });
}

function loadValuesData(values) {
    const valueHeaders = document.querySelectorAll('.values-section .value-header');
    values.forEach(data => {
        // Find the correct value item by name
        const header = Array.from(valueHeaders).find(h => h.querySelector('.trait-name').textContent === data.name);
        if (header) {
            header.querySelector('.dice-rating').value = data.rating || 'd8';
            header.nextElementSibling.querySelector('.value-statement').value = data.statement || '';
        }
    });
}

function loadApproachesData(approaches) {
    const approachItems = document.querySelectorAll('.approaches-list .approach-item');
     approaches.forEach(data => {
        const item = Array.from(approachItems).find(i => i.querySelector('.approach-name').textContent === data.name);
        if (item) {
            item.querySelector('.dice-rating').value = data.rating || 'd6';
        }
    });
}

function loadRolesData(roles) {
    const roleHeaders = document.querySelectorAll('.roles-list .role-header');
    roles.forEach(data => {
        const header = Array.from(roleHeaders).find(h => h.querySelector('.role-name').textContent === data.name);
        if (header) {
            header.querySelector('.dice-rating').value = data.rating || 'd6';
        }
    });
}

function loadTrackersData(trackers) {
    const updateCircles = (type, data) => {
        if (!data) return;
        const circles = document.querySelectorAll(`[data-tracker-type="${type}"] .circle`);
        circles.forEach((circle, index) => {
            circle.classList.toggle('filled', !!data[index]);
            circle.setAttribute('aria-checked', !!data[index]);
        });
    };
    updateCircles('physical', trackers.physical);
    updateCircles('mental', trackers.mental);
    updateCircles('momentum', trackers.momentum);

    if (trackers.resolve) {
        document.querySelector('.resolve-value').textContent = trackers.resolve;
        if(typeof updateResolveValueClasses === 'function') updateResolveValueClasses(trackers.resolve);
    }
}

function loadTalentsData(talents) {
    const talentSlots = document.querySelectorAll('.talent-slot');
    talents.forEach((data, index) => {
        if (index >= talentSlots.length) return;
        const slot = talentSlots[index];
        slot.querySelector('.talent-name').value = data.name || '';
        slot.querySelector('.talent-tag').value = data.tag || '';
        slot.querySelector('.talent-description').value = data.description || '';
        slot.classList.toggle('filled', data.filled);
    });
}

// --- Export / Import ---

function setupExportImport() {
    if (document.getElementById('export-character')) return;

    const exportBtn = document.createElement('button');
    exportBtn.id = 'export-character';
    exportBtn.className = 'character-action-btn';
    exportBtn.textContent = 'Export Character';
    exportBtn.addEventListener('click', exportCharacter);

    const importBtn = document.createElement('button');
    importBtn.id = 'import-character';
    importBtn.className = 'character-action-btn';
    importBtn.textContent = 'Import Character';
    importBtn.addEventListener('click', () => document.getElementById('import-file-input')?.click());

    // FIX: Create a single, hidden file input and reuse it.
    const importInput = document.createElement('input');
    importInput.type = 'file';
    importInput.id = 'import-file-input';
    importInput.accept = '.json,application/json';
    importInput.style.display = 'none';
    importInput.addEventListener('change', importCharacterFile);

    const actionTitle = document.createElement('h3');
    actionTitle.textContent = 'Character Management';
    actionTitle.style.cssText = `
        text-align: center; 
        color: var(--color-accent); 
        font-family: var(--font-header); 
        margin-bottom: 10px;`;

    const actionBar = document.createElement('div');
    actionBar.className = 'character-actions';

    const actionSection = document.createElement('div');
    actionSection.className = 'character-actions-section';
    actionSection.style.cssText = `
        margin-top: 30px; 
        border-top: 3px double var(--color-border); 
        padding-top: 20px;`;

    actionSection.appendChild(actionTitle);
    actionSection.appendChild(actionBar);
    actionBar.appendChild(exportBtn);
    actionBar.appendChild(importBtn);
    actionBar.appendChild(importInput); // Add hidden input to the DOM
    document.querySelector('.character-sheet').appendChild(actionSection);
}

function exportCharacter() {
    // Call save one last time to ensure data is fresh
    saveCharacterData();
    const characterDataString = localStorage.getItem('wheelOfFateCharacter');
    if (!characterDataString) {
        showNotification("No character data to export.", 'error');
        return;
    }

    const characterData = JSON.parse(characterDataString);
    const charName = characterData.characterName?.trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '_') || 'character';
    const filename = `wheel-of-fate-${charName}.json`;

    const blob = new Blob([characterDataString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showNotification(`Character exported as ${filename}`, 'success');
}

function importCharacterFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const fileContent = e.target.result;
            // Basic validation: Is it valid JSON?
            JSON.parse(fileContent);

            // Save and reload
            localStorage.setItem('wheelOfFateCharacter', fileContent);
            loadCharacterData();
            
            showNotification('Character imported successfully!', 'success');
        } catch (error) {
            console.error("Import failed:", error);
            showNotification('Import failed. The file is not a valid character sheet.', 'error');
        } finally {
            // Reset file input to allow importing the same file again
            event.target.value = '';
        }
    };
    reader.onerror = () => {
        showNotification('Error reading the file.', 'error');
        event.target.value = '';
    };
    reader.readAsText(file);
}

// --- Notifications ---

function showNotification(message, type = 'success') {
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        document.body.appendChild(notification);
    }
    
    if (window.notificationTimeout) clearTimeout(window.notificationTimeout);

    const icon = type === 'success' ? '✓' : '✗';
    notification.innerHTML = `<strong>${icon}</strong> ${message}`;
    notification.className = 'notification show ' + type;

    window.notificationTimeout = setTimeout(() => {
        notification.classList.remove('show');
    }, 4000);
}