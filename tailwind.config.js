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
        primary: '#c5a059',
        secondary: '#d4b16b',
        accent: '#b08f49',
        background: '#f9f8f4',
        surface: '#ffffff',
        border: '#ece9df',
        text: '#2d2d2d',
        muted: '#6b7280', // gray-500
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
