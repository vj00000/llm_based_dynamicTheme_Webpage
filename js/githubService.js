// GitHub API service for managing configs in a remote repository
let lastGeneratedConfig = null;
let lastGeneratedConfigKey = null;

/**
 * Store the last generated config for potential push
 * @param {string} key - Config key
 * @param {Object} config - Config object
 */
export function setLastGeneratedConfig(key, config) {
    lastGeneratedConfig = config;
    lastGeneratedConfigKey = key;
}

/**
 * Get the last generated config
 * @returns {Object|null} Last generated config
 */
export function getLastGeneratedConfig() {
    return { key: lastGeneratedConfigKey, config: lastGeneratedConfig };
}

/**
 * Push a config to GitHub repository
 * @param {string} githubToken - GitHub personal access token
 * @param {string} repoOwner - Repository owner (username or org)
 * @param {string} repoName - Repository name
 * @param {string} configKey - Config key/filename
 * @param {Object} config - Config object to push
 * @param {string} branch - Branch name (default: 'main')
 * @returns {Promise<Object>} GitHub API response
 */
export async function pushConfigToGitHub(githubToken, repoOwner, repoName, configKey, config, branch = 'main') {
    const statusDiv = document.getElementById('githubStatus');
    statusDiv.textContent = 'Pushing to GitHub...';
    statusDiv.style.color = '#2196F3';

    try {
        // Get the current file SHA if it exists (for update)
        const filePath = configKey.endsWith('.json') ? configKey : `${configKey}.json`;
        let fileSha = null;

        try {
            const getFileResponse = await fetch(
                `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}?ref=${branch}`,
                {
                    headers: {
                        'Authorization': `token ${githubToken}`,
                        'Accept': 'application/vnd.github.v3+json'
                    }
                }
            );

            if (getFileResponse.ok) {
                const fileData = await getFileResponse.json();
                fileSha = fileData.sha;
            }
        } catch (e) {
            // File doesn't exist, will create new one
            console.log('File does not exist, will create new:', e);
        }

        // Encode content to base64
        const content = JSON.stringify(config, null, 2);
        const encodedContent = btoa(unescape(encodeURIComponent(content)));

        // Prepare the request
        const requestBody = {
            message: `Add/Update theme config: ${config.name || configKey}`,
            content: encodedContent,
            branch: branch
        };

        // If file exists, include SHA for update
        if (fileSha) {
            requestBody.sha = fileSha;
        }

        const response = await fetch(
            `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`,
            {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${githubToken}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `GitHub API Error: ${response.statusText}`);
        }

        const result = await response.json();
        statusDiv.textContent = `✓ Config pushed to GitHub successfully!`;
        statusDiv.style.color = '#4CAF50';
        
        return result;

    } catch (error) {
        console.error('Error pushing to GitHub:', error);
        statusDiv.textContent = `✗ Error: ${error.message}`;
        statusDiv.style.color = '#F44336';
        throw error;
    }
}

/**
 * Pull configs from GitHub repository
 * @param {string} repoOwner - Repository owner
 * @param {string} repoName - Repository name
 * @param {string} path - Path to configs folder (default: '')
 * @param {string} branch - Branch name (default: 'main')
 * @returns {Promise<Array>} Array of config objects
 */
export async function pullConfigsFromGitHub(repoOwner, repoName, path = '', branch = 'main') {
    const statusDiv = document.getElementById('githubStatus');
    statusDiv.textContent = 'Pulling configs from GitHub...';
    statusDiv.style.color = '#2196F3';

    try {
        const apiPath = path ? `${path}/` : '';
        const response = await fetch(
            `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${apiPath}?ref=${branch}`,
            {
                headers: {
                    'Accept': 'application/vnd.github.v3+json'
                }
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch repository contents: ${response.statusText}`);
        }

        const contents = await response.json();
        const configs = [];

        // Filter for JSON files and fetch their contents
        for (const item of contents) {
            if (item.type === 'file' && item.name.endsWith('.json')) {
                try {
                    const fileResponse = await fetch(item.download_url);
                    if (fileResponse.ok) {
                        const config = await fileResponse.json();
                        const configKey = path ? `${path}/${item.name}` : item.name;
                        configs.push({ key: configKey, config: config });
                    }
                } catch (e) {
                    console.error(`Error fetching ${item.name}:`, e);
                }
            }
        }

        statusDiv.textContent = `✓ Loaded ${configs.length} config(s) from GitHub`;
        statusDiv.style.color = '#4CAF50';

        return configs;

    } catch (error) {
        console.error('Error pulling from GitHub:', error);
        statusDiv.textContent = `✗ Error: ${error.message}`;
        statusDiv.style.color = '#F44336';
        throw error;
    }
}

/**
 * Parse GitHub repository URL
 * @param {string} repoUrl - GitHub repository URL
 * @returns {Object} {owner, name} or null if invalid
 */
export function parseGitHubUrl(repoUrl) {
    // Handle various GitHub URL formats
    const patterns = [
        /github\.com\/([^\/]+)\/([^\/]+)(?:\.git)?(?:\/.*)?$/,
        /^([^\/]+)\/([^\/]+)$/
    ];

    for (const pattern of patterns) {
        const match = repoUrl.match(pattern);
        if (match) {
            return {
                owner: match[1],
                name: match[2].replace('.git', '')
            };
        }
    }

    return null;
}

