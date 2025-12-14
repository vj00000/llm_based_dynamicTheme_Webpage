// GitHub UI management
import { getGitHubSettings, saveGitHubSettings, pushLastGeneratedConfig, pullConfigsFromRepo } from './githubManager.js';

/**
 * Initialize GitHub UI with saved settings
 */
export function initGitHubUI() {
    const settings = getGitHubSettings();
    
    document.getElementById('githubTokenInput').value = settings.token;
    document.getElementById('githubRepoInput').value = settings.repoUrl;
    document.getElementById('githubBranchInput').value = settings.branch;
    document.getElementById('githubPathInput').value = settings.configPath;
}

/**
 * Setup GitHub UI event listeners
 */
export function setupGitHubUI() {
    // Show/Hide GitHub Settings form
    const showButton = document.getElementById('showGitHubSettingsButton');
    const hideButton = document.getElementById('hideGitHubSettingsButton');
    const githubSettings = document.getElementById('githubSettings');
    
    if (showButton && githubSettings) {
        showButton.addEventListener('click', () => {
            githubSettings.style.display = 'block';
            // Hide AI Generator if open
            const aiGenerator = document.getElementById('aiGenerator');
            if (aiGenerator) {
                aiGenerator.style.display = 'none';
            }
        });
    }
    
    if (hideButton && githubSettings) {
        hideButton.addEventListener('click', () => {
            githubSettings.style.display = 'none';
        });
    }

    // Show/Hide AI Generator form
    const showAIButton = document.getElementById('showAIGeneratorButton');
    const hideAIButton = document.getElementById('hideAIGeneratorButton');
    const aiGenerator = document.getElementById('aiGenerator');
    
    if (showAIButton && aiGenerator) {
        showAIButton.addEventListener('click', () => {
            aiGenerator.style.display = 'block';
            // Hide GitHub Settings if open
            if (githubSettings) {
                githubSettings.style.display = 'none';
            }
        });
    }
    
    if (hideAIButton && aiGenerator) {
        hideAIButton.addEventListener('click', () => {
            aiGenerator.style.display = 'none';
        });
    }

    // Save settings button
    const saveButton = document.getElementById('saveGitHubSettingsButton');
    if (saveButton) {
        saveButton.addEventListener('click', () => {
            const settings = {
                token: document.getElementById('githubTokenInput').value.trim(),
                repoUrl: document.getElementById('githubRepoInput').value.trim(),
                branch: document.getElementById('githubBranchInput').value.trim() || 'main',
                configPath: document.getElementById('githubPathInput').value.trim()
            };

            saveGitHubSettings(settings);
            const statusDiv = document.getElementById('githubStatus');
            statusDiv.textContent = '✓ Settings saved!';
            statusDiv.style.color = '#4CAF50';
        });
    }

    // Push to GitHub button
    const pushButton = document.getElementById('pushToGitHubButton');
    if (pushButton) {
        pushButton.addEventListener('click', async () => {
            try {
                await pushLastGeneratedConfig();
            } catch (error) {
                console.error('Error pushing to GitHub:', error);
            }
        });
    }

    // Pull from GitHub button
    const pullButton = document.getElementById('pullFromGitHubButton');
    if (pullButton) {
        pullButton.addEventListener('click', async () => {
            try {
                await pullConfigsFromRepo();
            } catch (error) {
                console.error('Error pulling from GitHub:', error);
            }
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initGitHubUI();
        setupGitHubUI();
    });
} else {
    initGitHubUI();
    setupGitHubUI();
}

