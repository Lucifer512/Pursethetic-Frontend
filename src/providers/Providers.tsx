"use client";

import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ShopProvider } from '../context/ShopContext';
import { BRAND } from '../styles/tokens';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import '@fontsource/playfair-display/400.css';
import '@fontsource/playfair-display/700.css';

const muiTheme = createTheme({
  palette: {
    primary: {
      main: BRAND.primary,
      contrastText: BRAND.surface,
    },
    secondary: {
      main: BRAND.accent,
      contrastText: BRAND.foreground,
    },
    background: {
      default: BRAND.background,
      paper: BRAND.surface,
    },
    text: {
      primary: BRAND.foreground,
      secondary: BRAND.muted,
    },
    divider: BRAND.border,
    success: {
      main: BRAND.success,
    },
    error: {
      main: BRAND.error,
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
    h1: { fontFamily: 'Playfair Display, serif' },
    h2: { fontFamily: 'Playfair Display, serif' },
    h3: { fontFamily: 'Playfair Display, serif' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: BRAND.background,
          color: BRAND.foreground,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: BRAND.radiusXl,
          textTransform: 'none',
          border: `1px solid ${BRAND.border}`,
        },
        contained: {
          backgroundColor: BRAND.primary,
          color: BRAND.foreground,
          '&:hover': { backgroundColor: BRAND.primaryHover },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderColor: BRAND.border,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 6,
          border: `1px solid ${BRAND.border}`,
        },
      },
    },
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <ShopProvider>{children}</ShopProvider>
    </ThemeProvider>
  );
}
