/**
 * Roles Enhancer for Wheel of Fate Character Sheet
 * Enhances the Roles section with additional functionality
 */

document.addEventListener('DOMContentLoaded', function () {
    initializeRolesEnhancer();
});

function initializeRolesEnhancer() {
    // Add role descriptions and tooltips
    enhanceRoleDescriptions();

    // Add visual indicators for role specialization
    addRoleSpecializationIndicators();
    
    // Set up CSS styles for the enhancements
    addRolesEnhancerStyles();
}

function enhanceRoleDescriptions() {
    const roleDescriptions = {
        'Enforcer': {
            description: 'Masters of physical force and combat expertise.',
            examples: 'Fighting, intimidating, feats of strength, enduring physical hardship.'
        },
        'Rogue': {
            description: 'Experts in stealth, deception, and agility.',
            examples: 'Sneaking, stealing, acrobatics, fast-talking, escaping bonds.'
        },
        'Arcanist': {
            description: 'Wielders of magical knowledge and supernatural abilities.',
            examples: 'Casting spells, identifying magical effects, understanding mystical phenomena.'
        },
        'Diplomat': {
            description: 'Masters of social interaction and persuasion.',
            examples: 'Negotiating, charming, gathering information, reading intentions.'
        },
        'Strategist': {
            description: 'Experts in planning, analysis, and tactical thinking.',
            examples: 'Devising plans, solving puzzles, recalling knowledge, analyzing situations.'
        }
    };

    document.querySelectorAll('.roles-list .role-item').forEach(item => {
        const roleNameElement = item.querySelector('.role-name');
        if (!roleNameElement) return;
        const roleName = roleNameElement.textContent;

        if (roleDescriptions[roleName]) {
            const roleInfo = roleDescriptions[roleName];

            // Create enhanced tooltip content
            const tooltipContent = `
                <div class="role-tooltip-content">
                    <p><strong>${roleName}</strong></p>
                    <p>${roleInfo.description}</p>
                    <p><em>Examples:</em> ${roleInfo.examples}</p>
                </div>
            `;
            item.setAttribute('data-tooltip', tooltipContent);

            // --- ICON MODIFICATION START ---
            // Check if an icon already exists to prevent duplication on reloads
            if (!item.querySelector('.role-info-icon')) {
                const infoIcon = document.createElement('span');
                infoIcon.className = 'role-info-icon';
                // **FIX: Replace the blue emoji with a simple '?'**
                infoIcon.innerHTML = '?'; 
                infoIcon.setAttribute('aria-label', `Information about ${roleName} role`);

                // Insert it right after the role name for better alignment
                roleNameElement.insertAdjacentElement('afterend', infoIcon);
            }
            // --- ICON MODIFICATION END ---
        }
    });
}

function addRoleSpecializationIndicators() {
    document.querySelectorAll('.roles-list .role-item').forEach(item => {
        const diceRating = item.querySelector('.dice-rating');
        if (diceRating) {
            updateRoleSpecialization(diceRating, item);
            diceRating.addEventListener('change', () => updateRoleSpecialization(diceRating, item));
        }
    });
}

function updateRoleSpecialization(diceRating, roleItem) {
    roleItem.classList.remove('role-novice', 'role-competent', 'role-expert', 'role-master');
    const rating = diceRating.value;
    let specClass = '';
    if (rating === 'd4') specClass = 'role-novice';
    else if (rating === 'd6') specClass = 'role-competent';
    else if (rating === 'd8') specClass = 'role-expert';
    else if (rating === 'd10' || rating === 'd12') specClass = 'role-master';
    if (specClass) roleItem.classList.add(specClass);
}

function addRolesEnhancerStyles() {
    let rolesStyles = document.getElementById('roles-enhancer-styles');
    if (rolesStyles) return; 

    rolesStyles = document.createElement('style');
    rolesStyles.id = 'roles-enhancer-styles';
    document.head.appendChild(rolesStyles);

    // --- CSS MODIFICATION START ---
    rolesStyles.textContent = `
        /* Role specialization indicators (left border removed) */
        .role-novice {}
        .role-competent {}
        .role-expert {}
        .role-master {
            background-color: rgba(197, 168, 105, 0.05); /* Keep the subtle background for masters */
        }
        
        /* **FIX: New styles for the theme-consistent info icon** */
        .role-info-icon {
            font-family: var(--font-header); /* Use a stylized font */
            font-weight: 700;
            color: var(--color-accent);
            border: 1px solid var(--color-border);
            border-radius: 50%;
            width: 18px;
            height: 18px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            line-height: 1;
            font-size: 14px;
            margin: 0 8px; /* Give it some space */
            cursor: help;
            transition: all 0.2s ease;
        }
        
        .role-info-icon:hover {
            background-color: var(--color-accent);
            color: var(--color-bg);
            box-shadow: 0 0 5px var(--color-accent);
        }
        
        /* Role tooltip content styling */
        .role-tooltip-content {
            max-width: 250px;
            text-align: left;
        }
        
        .role-tooltip-content p {
            margin: 5px 0;
        }
        
        /* Enhanced role item layout to align all elements */
        .role-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 10px;
        }
    `;
    // --- CSS MODIFICATION END ---
}