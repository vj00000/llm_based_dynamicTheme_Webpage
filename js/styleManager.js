// Style management functions

/**
 * Apply styles from JSON to an element
 * @param {HTMLElement} element - The DOM element to style
 * @param {Object} styles - Object containing style properties
 */
export function applyStyles(element, styles) {
    if (!element || !styles) return;
    
    for (const [property, value] of Object.entries(styles)) {
        // Skip non-style properties (like colors array, colorProperty, initialColor)
        if (property === 'colors' || property === 'colorProperty' || property === 'initialColor') {
            continue;
        }
        // Handle special CSS properties that need conversion
        if (property === 'background') {
            if (value.includes('gradient') || value.includes('linear-gradient') || value.includes('radial-gradient')) {
                element.style.backgroundImage = value;
                element.style.backgroundColor = ''; // Clear backgroundColor when using gradient
            } else {
                element.style.backgroundColor = value;
                element.style.backgroundImage = ''; // Clear backgroundImage when using solid color
            }
        } else {
            // Apply style directly (JavaScript style properties use camelCase)
            element.style[property] = value;
        }
    }
}

/**
 * Apply all styles from config to the page
 * @param {Object} config - Configuration object with styles
 */
export function applyAllStyles(config) {
    if (!config || !config.styles) {
        console.error('Config or styles not found');
        return;
    }

    const body = document.body;
    const heading = document.getElementById('heading');
    const button = document.getElementById('colorButton');
    const configSelector = document.getElementById('configSelector');
    const configLabel = document.getElementById('configLabel');
    const configSelect = document.getElementById('configSelect');
    
    // Apply body styles
    if (config.styles.body) {
        applyStyles(body, config.styles.body);
    }
    
    // Apply heading styles
    if (config.styles.heading) {
        applyStyles(heading, config.styles.heading);
    }
    
    // Apply button styles
    if (config.styles.button) {
        applyStyles(button, config.styles.button);
        
        // Apply initial button color (this should override any previous color)
        if (config.styles.button.initialColor) {
            const colorProperty = config.styles.button.colorProperty || 'backgroundColor';
            button.style[colorProperty] = config.styles.button.initialColor;
        }
    }

    // Apply styles to config selector if specified
    if (config.styles.configSelector) {
        applyStyles(configSelector, config.styles.configSelector);
        applyStyles(configLabel, config.styles.configSelector);
        // Apply color to select, but set appropriate background
        if (config.styles.configSelector.color) {
            configSelect.style.color = config.styles.configSelector.color;
        }
        // Set background for select dropdown based on theme
        if (config.styles.body) {
            // Check for background property first (could be gradient)
            if (config.styles.body.background) {
                const bgValue = config.styles.body.background;
                if (bgValue.includes('gradient') || bgValue.includes('linear-gradient') || bgValue.includes('radial-gradient')) {
                    // For gradient backgrounds, use a solid color for select
                    configSelect.style.backgroundColor = "#ffffff";
                    configSelect.style.color = "#333333";
                    configSelect.style.backgroundImage = '';
                } else {
                    configSelect.style.backgroundColor = bgValue;
                    configSelect.style.backgroundImage = '';
                }
            } else if (config.styles.body.backgroundColor) {
                configSelect.style.backgroundColor = config.styles.body.backgroundColor;
                configSelect.style.backgroundImage = ''; // Clear gradient if exists
            }
        }
        // Add padding and border for better visibility
        configSelect.style.padding = "5px 10px";
        configSelect.style.borderRadius = "4px";
        configSelect.style.border = "1px solid";
        if (config.styles.configSelector.color) {
            configSelect.style.borderColor = config.styles.configSelector.color;
        }

        // Apply styles to AI generator section
        const aiGenerator = document.getElementById('aiGenerator');
        if (aiGenerator) {
            if (config.styles.configSelector.color) {
                aiGenerator.style.color = config.styles.configSelector.color;
            }
            // Set border color to match theme
            if (config.styles.configSelector.color) {
                aiGenerator.style.borderColor = config.styles.configSelector.color;
            }
            // Set background based on body
            if (config.styles.body) {
                if (config.styles.body.backgroundColor) {
                    aiGenerator.style.backgroundColor = config.styles.body.backgroundColor;
                    aiGenerator.style.opacity = '0.9';
                } else if (config.styles.body.background) {
                    // For gradients, use a semi-transparent overlay
                    aiGenerator.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }
            }
        }
    }
}

