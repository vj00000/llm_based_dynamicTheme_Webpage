// Configuration management functions
import { configs } from './configs.js';
import { applyAllStyles } from './styleManager.js';

let currentConfig = null;
let currentColorIndex = 0;

/**
 * Load configuration and apply styles
 * @param {string} configFile - Key of the config to load
 */
export function loadConfig(configFile) {
    if (configs[configFile]) {
        currentConfig = configs[configFile];
        currentColorIndex = 0; // Reset color index when switching configs
        console.log('Loading config:', configFile, currentConfig);
        applyAllStyles(currentConfig);
    } else {
        console.error('Config not found:', configFile);
        alert('Theme not found. Please check the console for details.');
    }
}

/**
 * Get current configuration
 * @returns {Object|null} Current config object
 */
export function getCurrentConfig() {
    return currentConfig;
}

/**
 * Get current color index
 * @returns {number} Current color index
 */
export function getCurrentColorIndex() {
    return currentColorIndex;
}

/**
 * Set current color index
 * @param {number} index - New color index
 */
export function setCurrentColorIndex(index) {
    currentColorIndex = index;
}

/**
 * Add a new configuration
 * @param {string} key - Config key
 * @param {Object} config - Config object
 */
export function addConfig(key, config) {
    configs[key] = config;
}

/**
 * Get all configurations
 * @returns {Object} All configs
 */
export function getAllConfigs() {
    return configs;
}

/**
 * Update dropdown with all available configs
 */
export function updateConfigDropdown() {
    const select = document.getElementById('configSelect');
    select.innerHTML = '';
    
    for (const [key, value] of Object.entries(configs)) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = value.name || key;
        select.appendChild(option);
    }
}

