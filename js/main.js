// Main entry point - sets up AI generation button handler
import { generateConfigWithAI } from './apiService.js';

/**
 * Initialize AI generation functionality
 */
export function initAIGeneration() {
    const generateButton = document.getElementById('generateButton');
    
    if (generateButton) {
        generateButton.addEventListener('click', () => {
            const apiKey = document.getElementById('apiKeyInput').value.trim();
            const prompt = document.getElementById('promptInput').value.trim();

            if (!apiKey) {
                alert('Please enter your Gemini API key');
                return;
            }

            if (!prompt) {
                alert('Please enter a theme description');
                return;
            }

            generateConfigWithAI(apiKey, prompt).catch(error => {
                // Error already handled in generateConfigWithAI
                console.error('Generation failed:', error);
            });
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAIGeneration);
} else {
    initAIGeneration();
}

