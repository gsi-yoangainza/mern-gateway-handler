import React from 'react';
import { ThemeProvider } from 'styled-components';

export type Colors =
  | 'primary'
  | 'secondary'
  | 'gray1'
  | 'gray2'
  | 'gray3'
  | 'gray4'
  | 'gray5'
  | 'gray6'
  | 'white'
  | 'bgColor'
  | 'neutral1'
  | 'neutral2'
  | 'neutral3'
  | 'neutral4'
  | 'neutral5'
  | 'neutral6'
  | 'neutral7';

export type ColorVariantGroup = 'normal' | 'hover' | 'active' | 'text';
export type ColorVariant = 'primary' | 'secondary' | 'dark';
export type Sizes = 'mini' | 'micro' | 'small' | 'medium' | 'xmedium' | 'large' | 'xlarge';
export type FontSizes = Record<Sizes, string>;
export type FontStyle =
  | 'lighter'
  | 'normal'
  | 'normal-medium'
  | 'medium'
  | 'normal-bold'
  | 'bold'
  | 'italic'
  | 'italic-medium'
  | 'italic-bold';

export interface ThemeRecord {
  colors: Record<Colors, string>;
  fonts: string[];
  fontSizes: FontSizes;
  radius: number;
}

export const colors: Record<Colors, string> = {
  primary: '#18181b',
  secondary: '#FB7756',
  gray1: '#333333',
  gray2: '#4F4F4F',
  gray3: '#828282',
  gray4: '#BDBDBD',
  gray5: '#E0E0E0',
  gray6: '#737373',
  white: '#FFFFFF',
  bgColor: '#F8F8F8',
  neutral1: '#9C0D08',
  neutral2: '#EB5757',
  neutral3: '#4D9C08',
  neutral4: '#4AA3F2',
  neutral5: '#d20202',
  neutral6: '#C55002',
  neutral7: '#3D8203',
};

export const theme: ThemeRecord = {
  colors,
  fonts: ['sans-serif', 'Open Sans'],
  fontSizes: {
    mini: '14px',
    micro: '16px',
    small: '18px',
    medium: '22px',
    xmedium: '25px',
    large: '27px',
    xlarge: '32px',
  },
  radius: 5,
};

type ThemeType = {
  children: React.ReactNode;
};

const Theme: React.FC<ThemeType> = ({ children }: ThemeType) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;

export default Theme;
