// All theme configurations
export const configs = {
    'configs/config1.json': {
        "name": "Default Theme",
        "styles": {
            "body": {
                "fontFamily": "Arial, sans-serif",
                "display": "flex",
                "flexDirection": "column",
                "alignItems": "center",
                "justifyContent": "center",
                "minHeight": "100vh",
                "margin": "0",
                "backgroundColor": "#f0f0f0"
            },
            "heading": {
                "marginBottom": "30px",
                "color": "#333333",
                "fontSize": "2em"
            },
            "button": {
                "padding": "15px 30px",
                "fontSize": "18px",
                "border": "none",
                "borderRadius": "5px",
                "cursor": "pointer",
                "transition": "all 0.3s ease",
                "color": "#ffffff",
                "colorProperty": "backgroundColor",
                "initialColor": "#4CAF50",
                "colors": [
                    "#4CAF50",
                    "#2196F3",
                    "#FF9800",
                    "#F44336",
                    "#9C27B0",
                    "#00BCD4"
                ]
            },
            "configSelector": {
                "marginBottom": "20px",
                "color": "#333333"
            }
        }
    },
    'configs/config2.json': {
        "name": "Dark Theme",
        "styles": {
            "body": {
                "fontFamily": "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                "display": "flex",
                "flexDirection": "column",
                "alignItems": "center",
                "justifyContent": "center",
                "minHeight": "100vh",
                "margin": "0",
                "backgroundColor": "#1a1a1a"
            },
            "heading": {
                "marginBottom": "30px",
                "color": "#ffffff",
                "fontSize": "2em",
                "textShadow": "0 2px 4px rgba(0,0,0,0.5)"
            },
            "button": {
                "padding": "15px 30px",
                "fontSize": "18px",
                "border": "2px solid #ffffff",
                "borderRadius": "8px",
                "cursor": "pointer",
                "transition": "all 0.3s ease",
                "color": "#ffffff",
                "fontWeight": "500",
                "colorProperty": "backgroundColor",
                "initialColor": "#6c5ce7",
                "colors": [
                    "#6c5ce7",
                    "#a29bfe",
                    "#fd79a8",
                    "#fdcb6e",
                    "#00b894",
                    "#00cec9"
                ]
            },
            "configSelector": {
                "marginBottom": "20px",
                "color": "#ffffff"
            }
        }
    },
    'configs/config3.json': {
        "name": "Colorful Theme",
        "styles": {
            "body": {
                "fontFamily": "'Comic Sans MS', cursive, sans-serif",
                "display": "flex",
                "flexDirection": "column",
                "alignItems": "center",
                "justifyContent": "center",
                "minHeight": "100vh",
                "margin": "0",
                "background": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            },
            "heading": {
                "marginBottom": "30px",
                "color": "#ffffff",
                "fontSize": "2.5em",
                "textShadow": "2px 2px 4px rgba(0,0,0,0.3)"
            },
            "button": {
                "padding": "20px 40px",
                "fontSize": "20px",
                "fontWeight": "bold",
                "border": "none",
                "borderRadius": "25px",
                "cursor": "pointer",
                "transition": "all 0.3s ease",
                "boxShadow": "0 4px 15px rgba(0,0,0,0.2)",
                "color": "#ffffff",
                "colorProperty": "backgroundColor",
                "initialColor": "#ff6b6b",
                "colors": [
                    "#ff6b6b",
                    "#4ecdc4",
                    "#ffe66d",
                    "#ff8b94",
                    "#95e1d3",
                    "#f38181"
                ]
            },
            "configSelector": {
                "marginBottom": "20px",
                "color": "#ffffff"
            }
        }
    }
};

