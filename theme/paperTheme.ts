import { MD3LightTheme, configureFonts, MD3Theme } from 'react-native-paper';

// Centralized react-native-paper theme for consistent styling
const fontConfig = configureFonts({
  config: {
    fontFamily: undefined,
  },
});

export const paperTheme: MD3Theme = {
  ...MD3LightTheme,
  roundness: 8,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#2563EB',
    secondary: '#0284C7',
    surface: '#FFFFFF',
    background: '#F9FAFB',
    error: '#DC2626',
  },
  fonts: fontConfig,
};

export default paperTheme;

