/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                brand: {
                    dark: '#344c78',  // "EDUCANDÁRIO" color
                    light: '#8ccbf3', // "SODRÉ" color
                    yellow: '#ffe600' // Sun color
                },
                primary: {
                    50: '#f4f7fb',
                    100: '#e8edf6',
                    200: '#cddceb',
                    300: '#8ccbf3',
                    400: '#60a5fa',
                    500: '#344c78', // Main Brand Color
                    600: '#2a3d60',
                    700: '#20304b',
                    800: '#1a263a',
                    900: '#111927',
                },
                secondary: {
                    400: '#ffe600', // Brand Yellow
                    500: '#eab308',
                    600: '#ca8a04',
                }
            }
        },
    },
    plugins: [],
}
