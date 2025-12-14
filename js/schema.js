// Config JSON Schema for AI generation
export const configSchema = {
    "name": "string - Theme name",
    "styles": {
        "body": {
            "fontFamily": "string - CSS font family",
            "display": "string - CSS display property",
            "flexDirection": "string - CSS flex direction",
            "alignItems": "string - CSS align items",
            "justifyContent": "string - CSS justify content",
            "minHeight": "string - CSS min height",
            "margin": "string - CSS margin",
            "backgroundColor": "string - Hex color code (e.g., #f0f0f0)",
            "background": "string - CSS background (optional, for gradients like 'linear-gradient(...)')"
        },
        "heading": {
            "marginBottom": "string - CSS margin bottom",
            "color": "string - Hex color code",
            "fontSize": "string - CSS font size",
            "textShadow": "string - CSS text shadow (optional)"
        },
        "button": {
            "padding": "string - CSS padding",
            "fontSize": "string - CSS font size",
            "border": "string - CSS border",
            "borderRadius": "string - CSS border radius",
            "cursor": "string - CSS cursor",
            "transition": "string - CSS transition",
            "color": "string - Hex color code for text",
            "fontWeight": "string - CSS font weight (optional)",
            "boxShadow": "string - CSS box shadow (optional)",
            "colorProperty": "string - 'backgroundColor' (for button color changes)",
            "initialColor": "string - Hex color code for initial button color",
            "colors": "array of hex color codes - Array of colors to cycle through"
        },
        "configSelector": {
            "marginBottom": "string - CSS margin bottom",
            "color": "string - Hex color code"
        }
    }
};

