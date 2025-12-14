// Gemini API service
import { configSchema } from './schema.js';
import { addConfig, updateConfigDropdown, loadConfig } from './configManager.js';
import { setLastGeneratedConfig } from './githubService.js';

let generatedConfigCounter = 0;

/**
 * Generate config using Gemini API
 * @param {string} apiKey - Gemini API key
 * @param {string} prompt - User prompt for theme generation
 * @returns {Promise<Object>} Generated config object
 */
export async function generateConfigWithAI(apiKey, prompt) {
    const statusDiv = document.getElementById('generationStatus');
    statusDiv.textContent = 'Generating theme...';
    statusDiv.style.color = '#2196F3';

    try {
        const fullPrompt = `You are a web design expert. Generate a JSON configuration for a webpage theme based on this description: "${prompt}"

IMPORTANT: Return ONLY valid JSON, no markdown, no code blocks, no explanations. The JSON must strictly follow this schema:

${JSON.stringify(configSchema, null, 2)}

Requirements:
- All color values must be valid hex codes (e.g., #ffffff, #333333)
- The "colors" array in button should have at least 4-6 different colors
- Use camelCase for all CSS properties (e.g., fontSize, marginBottom, not font-size, margin-bottom)
- For gradients, use the "background" property with CSS gradient syntax
- For solid colors, use "backgroundColor" property
- Make sure all required properties are included
- The theme should be visually appealing and match the description

Generate the JSON now:`;

        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-goog-api-key': apiKey
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: fullPrompt
                    }]
                }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || `API Error: ${response.statusText}`);
        }

        const data = await response.json();
        const generatedText = data.candidates[0].content.parts[0].text;
        
        // Extract JSON from response (handle cases where LLM adds markdown or extra text)
        let jsonText = generatedText.trim();
        
        // Remove markdown code blocks if present
        jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        
        // Try to find JSON object in the response
        const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            jsonText = jsonMatch[0];
        }

        const generatedConfig = JSON.parse(jsonText);
        
        // Validate the generated config has required structure
        if (!generatedConfig.styles || !generatedConfig.styles.body || !generatedConfig.styles.button) {
            throw new Error('Generated config is missing required properties');
        }

        // Add generated config to configs object
        generatedConfigCounter++;
        const configKey = `generated_${generatedConfigCounter}.json`;
        generatedConfig.name = generatedConfig.name || `AI Generated Theme ${generatedConfigCounter}`;
        addConfig(configKey, generatedConfig);

        // Store for potential GitHub push
        setLastGeneratedConfig(configKey, generatedConfig);

        // Update dropdown
        updateConfigDropdown();
        
        // Select the new config
        document.getElementById('configSelect').value = configKey;
        loadConfig(configKey);

        statusDiv.textContent = `✓ Theme "${generatedConfig.name}" generated successfully! You can push it to GitHub if you like it.`;
        statusDiv.style.color = '#4CAF50';
        
        // Clear the prompt input
        document.getElementById('promptInput').value = '';

        // Show push button if GitHub is configured
        const pushButton = document.getElementById('pushToGitHubButton');
        if (pushButton) {
            pushButton.style.display = 'inline-block';
        }

        return generatedConfig;

    } catch (error) {
        console.error('Error generating config:', error);
        statusDiv.textContent = `✗ Error: ${error.message}`;
        statusDiv.style.color = '#F44336';
        throw error;
    }
}

