// GitHub integration manager
import { pushConfigToGitHub, pullConfigsFromGitHub, parseGitHubUrl, getLastGeneratedConfig } from './githubService.js';
import { addConfig, updateConfigDropdown, getAllConfigs } from './configManager.js';

/**
 * Initialize GitHub settings from localStorage
 * @returns {Object} GitHub settings
 */
export function getGitHubSettings() {
    return {
        token: localStorage.getItem('githubToken') || '',
        repoUrl: localStorage.getItem('githubRepoUrl') || '',
        branch: localStorage.getItem('githubBranch') || 'main',
        configPath: localStorage.getItem('githubConfigPath') || ''
    };
}

/**
 * Save GitHub settings to localStorage
 * @param {Object} settings - GitHub settings
 */
export function saveGitHubSettings(settings) {
    if (settings.token) localStorage.setItem('githubToken', settings.token);
    if (settings.repoUrl) localStorage.setItem('githubRepoUrl', settings.repoUrl);
    if (settings.branch) localStorage.setItem('githubBranch', settings.branch);
    if (settings.configPath !== undefined) localStorage.setItem('githubConfigPath', settings.configPath);
}

/**
 * Push the last generated config to GitHub
 * @returns {Promise<void>}
 */
export async function pushLastGeneratedConfig() {
    const settings = getGitHubSettings();
    const lastConfig = getLastGeneratedConfig();

    if (!lastConfig.config) {
        throw new Error('No generated config to push. Please generate a theme first.');
    }

    if (!settings.token) {
        throw new Error('GitHub token is required. Please configure it in GitHub Settings.');
    }

    if (!settings.repoUrl) {
        throw new Error('GitHub repository URL is required. Please configure it in GitHub Settings.');
    }

    const repoInfo = parseGitHubUrl(settings.repoUrl);
    if (!repoInfo) {
        throw new Error('Invalid GitHub repository URL format.');
    }

    // Generate a filename from the config name
    const filename = lastConfig.config.name
        ? lastConfig.config.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.json'
        : `generated-${Date.now()}.json`;

    const configPath = settings.configPath ? `${settings.configPath}/${filename}` : filename;

    await pushConfigToGitHub(
        settings.token,
        repoInfo.owner,
        repoInfo.name,
        configPath,
        lastConfig.config,
        settings.branch
    );
}

/**
 * Pull configs from GitHub and add them to the application
 * @returns {Promise<void>}
 */
export async function pullConfigsFromRepo() {
    const settings = getGitHubSettings();

    if (!settings.repoUrl) {
        throw new Error('GitHub repository URL is required. Please configure it in GitHub Settings.');
    }

    const repoInfo = parseGitHubUrl(settings.repoUrl);
    if (!repoInfo) {
        throw new Error('Invalid GitHub repository URL format.');
    }

    const configs = await pullConfigsFromGitHub(
        repoInfo.owner,
        repoInfo.name,
        settings.configPath,
        settings.branch
    );

    // Add pulled configs to the application
    for (const { key, config } of configs) {
        // Only add if not already exists (avoid overwriting local configs)
        const allConfigs = getAllConfigs();
        if (!allConfigs[key]) {
            addConfig(key, config);
        }
    }

    // Update dropdown
    updateConfigDropdown();
}

