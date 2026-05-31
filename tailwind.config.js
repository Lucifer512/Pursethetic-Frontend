/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#9b7a43',
        secondary: '#c4a269',
        accent: '#816437',
        background: '#f6f1e8',
        surface: '#fffaf1',
        border: '#e8dcc7',
        text: '#201a15',
        muted: '#6f6254', // warm neutral
        error: '#ef4444', // red-500
        success: '#22c55e', // green-500
        warning: '#f59e42', // orange-400
      },
      fontFamily: {
        body: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Playfair Display', 'serif'],
      },
      borderRadius: {
        xl: '0.75rem',
      },
      boxShadow: {
        card: '0 4px 24px 0 rgba(34, 34, 87, 0.08)',
      },
    },
  },
  plugins: [],
};
