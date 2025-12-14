# Dynamic Theme Webpage

A modular web application with dynamic theming and AI-powered theme generation.

## Features

- 🎨 Multiple pre-built themes
- 🤖 AI-powered theme generation using Gemini API
- 🔄 Dynamic theme switching
- 🎯 Modular codebase structure
- 🎨 Dynamic color-changing button

## Project Structure

```
.
├── configs/           # Theme configuration JSON files
│   ├── config1.json
│   ├── config2.json
│   └── config3.json
├── js/                # JavaScript modules
│   ├── apiService.js  # Gemini API integration
│   ├── app.js         # Main application logic
│   ├── configManager.js  # Config management
│   ├── configs.js     # Embedded configs
│   ├── main.js        # AI generation setup
│   ├── schema.js      # Config schema
│   └── styleManager.js # Style application
├── index.html         # Main HTML file
├── server.py          # Local development server
└── README.md          # This file
```

## Getting Started

### Option 1: Using Python Server (Recommended)

1. Make sure Python 3 is installed
2. Run the server:
   ```bash
   python3 server.py
   ```
3. Open your browser and navigate to:
   ```
   http://localhost:8000/index.html
   ```

### Option 2: Using Node.js http-server

1. Install http-server globally (if not already installed):
   ```bash
   npm install -g http-server
   ```
2. Run the server:
   ```bash
   http-server -p 8000
   ```
3. Open your browser and navigate to:
   ```
   http://localhost:8000/index.html
   ```

### Option 3: Using PHP Built-in Server

```bash
php -S localhost:8000
```

## Usage

1. **Select a Theme**: Use the dropdown to switch between pre-built themes
2. **Change Button Color**: Click the button to cycle through colors
3. **Generate AI Theme**:
   - Enter your Gemini API key
   - Describe the theme you want (e.g., "Create a modern blue theme with rounded buttons")
   - Click "Generate Theme"
   - The new theme will be added to the dropdown

## Getting a Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy and paste it into the "Gemini API Key" field

## Notes

- **ES Modules**: This application uses ES6 modules, which require a web server to run (cannot be opened directly as a file)
- **CORS**: The server includes CORS headers to allow module loading
- **Configs**: Theme configurations are embedded in `js/configs.js` to avoid CORS issues with JSON files

## Browser Compatibility

- Modern browsers with ES6 module support
- Chrome/Edge: ✅
- Firefox: ✅
- Safari: ✅
- Internet Explorer: ❌ (not supported)

