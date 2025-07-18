/**
 * Talent Manager for Wheel of Fate Character Sheet
 * Handles talent management and related functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeTalentManager();
});

function initializeTalentManager() {
    // Set up talent slots
    setupTalentSlots();
    
    // Add talent templates
    addTalentTemplates();
    
    // Add talent drag and drop functionality
    setupTalentDragDrop();
}

function setupTalentSlots() {
    const talentSlots = document.querySelectorAll('.talent-slot');
    
    talentSlots.forEach(slot => {
        const nameInput = slot.querySelector('.talent-name');
        const tagInput = slot.querySelector('.talent-tag');
        const descInput = slot.querySelector('.talent-description');
        
        // Add event listeners to detect when talent slots are filled
        [nameInput, tagInput, descInput].forEach(input => {
            if (input) {
                input.addEventListener('input', function() {
                    updateTalentSlotState(slot);
                });
                
                // Check initial state
                if (input.value.trim() !== '') {
                    slot.classList.add('filled');
                }
            }
        });
        
        // Add context menu for talent options
        addTalentContextMenu(slot);
    });
}

function updateTalentSlotState(slot) {
    const nameInput = slot.querySelector('.talent-name');
    const tagInput = slot.querySelector('.talent-tag');
    const descInput = slot.querySelector('.talent-description');
    
    // Check if any input has content
    const hasContent = 
        (nameInput && nameInput.value.trim() !== '') || 
        (tagInput && tagInput.value.trim() !== '') || 
        (descInput && descInput.value.trim() !== '');
    
    // Update filled state
    if (hasContent) {
        slot.classList.add('filled');
    } else {
        slot.classList.remove('filled');
    }
}

function addTalentContextMenu(slot) {
    // Create context menu button
    const menuButton = document.createElement('button');
    menuButton.className = 'talent-menu-btn';
    menuButton.innerHTML = '⋮';
    menuButton.setAttribute('aria-label', 'Talent options');
    menuButton.setAttribute('type', 'button');
    
    // Create context menu
    const contextMenu = document.createElement('div');
    contextMenu.className = 'talent-context-menu';
    
    // Add menu items
    const menuItems = [
        { text: 'Clear Talent', action: () => clearTalent(slot) },
        { text: 'Apply Template...', action: () => showTemplateSelector(slot) },
        { text: 'Move Up', action: () => moveTalent(slot, 'up') },
        { text: 'Move Down', action: () => moveTalent(slot, 'down') }
    ];
    
    menuItems.forEach(item => {
        const menuItem = document.createElement('button');
        menuItem.className = 'talent-menu-item';
        menuItem.textContent = item.text;
        menuItem.addEventListener('click', function(e) {
            e.stopPropagation();
            item.action();
            hideContextMenu();
        });
        contextMenu.appendChild(menuItem);
    });
    
    // Add menu to slot
    slot.querySelector('.talent-header').appendChild(menuButton);
    slot.appendChild(contextMenu);
    
    // Show/hide menu
    menuButton.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleContextMenu(contextMenu);
    });
    
    // Hide menu when clicking elsewhere
    document.addEventListener('click', function() {
        hideContextMenu();
    });
}

function toggleContextMenu(menu) {
    // Hide all other menus first
    document.querySelectorAll('.talent-context-menu').forEach(m => {
        if (m !== menu) {
            m.classList.remove('show');
        }
    });
    
    // Toggle this menu
    menu.classList.toggle('show');
}

function hideContextMenu() {
    document.querySelectorAll('.talent-context-menu').forEach(menu => {
        menu.classList.remove('show');
    });
}

function clearTalent(slot) {
    const nameInput = slot.querySelector('.talent-name');
    const tagInput = slot.querySelector('.talent-tag');
    const descInput = slot.querySelector('.talent-description');
    
    if (nameInput) nameInput.value = '';
    if (tagInput) tagInput.value = '';
    if (descInput) descInput.value = '';
    
    slot.classList.remove('filled');
}

function moveTalent(slot, direction) {
    const slotIndex = parseInt(slot.dataset.slotIndex);
    let targetIndex;
    
    if (direction === 'up' && slotIndex > 0) {
        targetIndex = slotIndex - 1;
    } else if (direction === 'down' && slotIndex < document.querySelectorAll('.talent-slot').length - 1) {
        targetIndex = slotIndex + 1;
    } else {
        return; // Can't move further
    }
    
    const targetSlot = document.querySelector(`.talent-slot[data-slot-index="${targetIndex}"]`);
    if (!targetSlot) return;
    
    // Swap talent data
    const sourceData = getTalentData(slot);
    const targetData = getTalentData(targetSlot);
    
    setTalentData(slot, targetData);
    setTalentData(targetSlot, sourceData);
    
    // Update visual states
    updateTalentSlotState(slot);
    updateTalentSlotState(targetSlot);
}

function getTalentData(slot) {
    return {
        name: slot.querySelector('.talent-name').value,
        tag: slot.querySelector('.talent-tag').value,
        description: slot.querySelector('.talent-description').value
    };
}

function setTalentData(slot, data) {
    slot.querySelector('.talent-name').value = data.name || '';
    slot.querySelector('.talent-tag').value = data.tag || '';
    slot.querySelector('.talent-description').value = data.description || '';
}

function addTalentTemplates() {
    // Define some talent templates
    window.talentTemplates = [
        {
            name: "Arcane Insight",
            tag: "Magic",
            description: "You can spend a Momentum to reveal a hidden magical property of an object or location you're examining."
        },
        {
            name: "Combat Reflexes",
            tag: "Combat",
            description: "Once per scene, you can reroll any die when defending against a surprise attack."
        },
        {
            name: "Silver Tongue",
            tag: "Social",
            description: "Add a d6 to your dice pool when attempting to persuade someone through charm or flattery."
        },
        {
            name: "Sixth Sense",
            tag: "Perception",
            description: "You can spend a Resolve to sense danger before it happens, giving you a chance to prepare."
        },
        {
            name: "Resourceful",
            tag: "General",
            description: "Once per session, declare that you have a useful item that would reasonably be in your possession."
        }
    ];
}

function showTemplateSelector(slot) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('talent-template-modal');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'talent-template-modal';
        modal.className = 'modal';
        
        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        
        // Add header
        const header = document.createElement('div');
        header.className = 'modal-header';
        header.innerHTML = '<h3>Select Talent Template</h3>';
        
        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'modal-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.setAttribute('aria-label', 'Close');
        closeBtn.addEventListener('click', function() {
            modal.classList.remove('show');
        });
        header.appendChild(closeBtn);
        
        // Add template list
        const templateList = document.createElement('div');
        templateList.className = 'template-list';
        
        // Add templates
        window.talentTemplates.forEach(template => {
            const templateItem = document.createElement('div');
            templateItem.className = 'template-item';
            
            const templateHeader = document.createElement('div');
            templateHeader.className = 'template-header';
            templateHeader.innerHTML = `<strong>${template.name}</strong> <span class="template-tag">${template.tag}</span>`;
            
            const templateDesc = document.createElement('div');
            templateDesc.className = 'template-description';
            templateDesc.textContent = template.description;
            
            templateItem.appendChild(templateHeader);
            templateItem.appendChild(templateDesc);
            
            // Add click handler
            templateItem.addEventListener('click', function() {
                applyTemplate(slot, template);
                modal.classList.remove('show');
            });
            
            templateList.appendChild(templateItem);
        });
        
        // Assemble modal
        modalContent.appendChild(header);
        modalContent.appendChild(templateList);
        modal.appendChild(modalContent);
        
        // Add to document
        document.body.appendChild(modal);
    }
    
    // Show modal
    modal.classList.add('show');
}

function applyTemplate(slot, template) {
    const nameInput = slot.querySelector('.talent-name');
    const tagInput = slot.querySelector('.talent-tag');
    const descInput = slot.querySelector('.talent-description');
    
    if (nameInput) nameInput.value = template.name;
    if (tagInput) tagInput.value = template.tag;
    if (descInput) descInput.value = template.description;
    
    slot.classList.add('filled');
}

function setupTalentDragDrop() {
    const talentSlots = document.querySelectorAll('.talent-slot');
    
    talentSlots.forEach(slot => {
        // Make draggable
        slot.setAttribute('draggable', 'true');
        
        // Add drag events
        slot.addEventListener('dragstart', handleDragStart);
        slot.addEventListener('dragover', handleDragOver);
        slot.addEventListener('dragenter', handleDragEnter);
        slot.addEventListener('dragleave', handleDragLeave);
        slot.addEventListener('drop', handleDrop);
        slot.addEventListener('dragend', handleDragEnd);
    });
}

// Drag and drop handlers
let draggedSlot = null;

function handleDragStart(e) {
    draggedSlot = this;
    
    // Set data transfer
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', this.dataset.slotIndex);
    
    // Add dragging class
    this.classList.add('dragging');
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    
    e.dataTransfer.dropEffect = 'move';
    
    return false;
}

function handleDragEnter(e) {
    this.classList.add('drag-over');
}

function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    // Only process if we're dropping on a different slot
    if (draggedSlot !== this) {
        // Swap talent data
        const sourceData = getTalentData(draggedSlot);
        const targetData = getTalentData(this);
        
        setTalentData(draggedSlot, targetData);
        setTalentData(this, sourceData);
        
        // Update visual states
        updateTalentSlotState(draggedSlot);
        updateTalentSlotState(this);
    }
    
    return false;
}

function handleDragEnd(e) {
    // Remove all drag classes
    document.querySelectorAll('.talent-slot').forEach(slot => {
        slot.classList.remove('dragging', 'drag-over');
    });
}

// Add CSS for talent manager
document.addEventListener('DOMContentLoaded', function() {
    addTalentManagerStyles();
});

function addTalentManagerStyles() {
    // Create style element if it doesn't exist
    let talentStyles = document.getElementById('talent-manager-styles');
    
    if (!talentStyles) {
        talentStyles = document.createElement('style');
        talentStyles.id = 'talent-manager-styles';
        document.head.appendChild(talentStyles);
        
        // Add talent manager styles
        talentStyles.textContent = `
            /* Talent menu button */
            .talent-menu-btn {
                background: none;
                border: none;
                color: var(--color-accent);
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
            
            .talent-menu-btn:hover {
                opacity: 1;
            }
            
            /* Talent context menu */
            .talent-context-menu {
                position: absolute;
                top: 100%;
                right: 0;
                background-color: var(--color-header-bg);
                border: 1px solid var(--color-border);
                border-radius: 4px;
                box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
                z-index: 10;
                display: none;
                flex-direction: column;
                min-width: 150px;
            }
            
            .talent-context-menu.show {
                display: flex;
            }
            
            .talent-menu-item {
                background: none;
                border: none;
                color: var(--color-text);
                text-align: left;
                padding: 8px 12px;
                cursor: pointer;
                transition: background-color 0.2s;
            }
            
            .talent-menu-item:hover {
                background-color: rgba(197, 168, 105, 0.2);
                color: var(--color-accent);
            }
            
            /* Talent drag and drop */
            .talent-slot.dragging {
                opacity: 0.5;
            }
            
            .talent-slot.drag-over {
                border-color: var(--color-accent);
                background-color: rgba(197, 168, 105, 0.1);
            }
            
            /* Modal */
            .modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                z-index: 100;
                justify-content: center;
                align-items: center;
            }
            
            .modal.show {
                display: flex;
            }
            
            .modal-content {
                background-color: var(--color-bg);
                border: 2px solid var(--color-border);
                border-radius: 5px;
                width: 90%;
                max-width: 500px;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px;
                border-bottom: 1px solid var(--color-border);
            }
            
            .modal-header h3 {
                margin: 0;
                color: var(--color-accent);
                font-family: var(--font-header);
            }
            
            .modal-close {
                background: none;
                border: none;
                color: var(--color-text);
                font-size: 1.5em;
                cursor: pointer;
                padding: 0;
                line-height: 1;
                opacity: 0.7;
                transition: opacity 0.2s;
            }
            
            .modal-close:hover {
                opacity: 1;
                color: var(--color-accent);
            }
            
            .template-list {
                padding: 15px;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            
            .template-item {
                padding: 10px;
                border: 1px solid var(--color-border);
                border-radius: 4px;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .template-item:hover {
                background-color: rgba(197, 168, 105, 0.1);
                border-color: var(--color-accent);
            }
            
            .template-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 5px;
            }
            
            .template-tag {
                background-color: var(--color-header-bg);
                color: var(--color-accent);
                padding: 2px 8px;
                border-radius: 10px;
                font-size: 0.8em;
                border: 1px solid var(--color-border);
            }
            
            .template-description {
                font-size: 0.9em;
                color: var(--color-text);
            }
        `;
    }
}