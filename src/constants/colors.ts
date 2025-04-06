import {DefaultTheme, DarkTheme} from '@react-navigation/native';
import {useAppSelector} from '@store';
import {useEffect, useState} from 'react';

export const _colorLight = {
  background: '#FFFFFF', // Clean white background
  primary: '#05A357', // Uber Eats green
  secondary: '#000000', // Black buttons/text
  accent: '#F2F2F2', // Soft gray backgrounds / highlights
  text: '#1C1C1E', // Almost black for high readability
  icon: '#8E8E93', // iOS-style gray icons
  border: '#E5E5EA', // Subtle borders
  card: '#FFFFFF', // Cards on white background
};

export const _colorDark = {
  background: '#121212', // Deep black background
  primary: '#05A357', // Uber Eats green (pops on dark)
  secondary: '#FFFFFF', // White text/buttons
  accent: '#1C1C1E', // Slightly lighter than full black
  text: '#FFFFFF', // Pure white text
  icon: '#B0B0B0', // Muted gray icons
  border: '#2C2C2E', // Dark gray borders
  card: '#1C1C1E', // Slightly lighter than full black
};

export const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    ..._colorDark,
  },
};

export const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ..._colorLight,
  },
};
