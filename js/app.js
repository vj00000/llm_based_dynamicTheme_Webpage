// Main application initialization and event handlers
import { loadConfig, getCurrentConfig, getCurrentColorIndex, setCurrentColorIndex } from './configManager.js';

/**
 * Handle button color change on click
 */
export function changeColor() {
    const config = getCurrentConfig();
    if (!config || !config.styles || !config.styles.button || !config.styles.button.colors) {
        return;
    }

    const button = document.getElementById('colorButton');
    const colors = config.styles.button.colors;
    
    // Cycle through colors
    let currentIndex = getCurrentColorIndex();
    currentIndex = (currentIndex + 1) % colors.length;
    setCurrentColorIndex(currentIndex);
    
    const colorProperty = config.styles.button.colorProperty || 'backgroundColor';
    button.style[colorProperty] = colors[currentIndex];
}

/**
 * Handle config switching
 * @param {Event} event - Change event
 */
export function handleConfigChange(event) {
    const select = event ? event.target : document.getElementById('configSelect');
    const selectedConfig = select.value;
    console.log('Config changed to:', selectedConfig);
    loadConfig(selectedConfig);
}

/**
 * Initialize the application
 */
export function init() {
    // Load default config
    loadConfig('configs/config1.json');
    
    // Set up event listeners
    const colorButton = document.getElementById('colorButton');
    const configSelect = document.getElementById('configSelect');
    
    if (colorButton) {
        colorButton.addEventListener('click', changeColor);
    }
    
    if (configSelect) {
        configSelect.addEventListener('change', handleConfigChange);
        console.log('Event listener attached to config selector');
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

