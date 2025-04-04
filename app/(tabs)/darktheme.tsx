import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the shape of our context
type ThemeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: (value: boolean) => Promise<void>;
  colors: {
    background: string;
    surface: string;
    primary: string;
    primaryLight: string;
    text: string;
    textSecondary: string;
    border: string;
    iconBackground: string;
  };
};

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider component
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Load dark mode setting on mount
    loadDarkModeSetting();
  }, []);

  const loadDarkModeSetting = async () => {
    try {
      const darkMode = await AsyncStorage.getItem('darkMode');
      // If no value is stored yet, use true as default
      setIsDarkMode(darkMode === null ? true : darkMode === 'true');
    } catch (error) {
      console.error('Error loading dark mode setting:', error);
    }
  };

  const toggleDarkMode = async (value: boolean) => {
    try {
      await AsyncStorage.setItem('darkMode', value.toString());
      setIsDarkMode(value);
    } catch (error) {
      console.error('Error saving dark mode setting:', error);
    }
  };

  const colors = {
    background: isDarkMode ? '#000000' : '#F9FAFB',
    surface: isDarkMode ? '#121212' : '#FFFFFF',
    primary: '#6366F1',
    primaryLight: '#818CF8',
    text: isDarkMode ? '#FFFFFF' : '#1F2937',
    textSecondary: isDarkMode ? '#A1A1AA' : '#6B7280',
    border: isDarkMode ? '#27272A' : '#E5E7EB',
    iconBackground: isDarkMode ? '#27272A' : '#EEF2FF'
  };

  const value = {
    isDarkMode,
    toggleDarkMode,
    colors,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// Custom hook to use the theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}