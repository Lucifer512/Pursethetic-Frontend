import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  colors: {
    primary: '#2563eb', // blue-600
    secondary: '#f59e42', // orange-400
    accent: '#10b981', // emerald-500
    background: '#f9fafb', // gray-50
    surface: '#ffffff',
    border: '#e5e7eb', // gray-200
    text: '#1f2937', // gray-800
    muted: '#6b7280', // gray-500
    error: '#ef4444', // red-500
    success: '#22c55e', // green-500
    warning: '#facc15', // yellow-400
  },
  font: {
    body: 'Inter, system-ui, sans-serif',
    heading: 'Inter, system-ui, sans-serif',
  },
  borderRadius: '0.75rem', // xl
  boxShadow: '0 4px 24px 0 rgba(34, 34, 87, 0.08)',
};

export default theme;
