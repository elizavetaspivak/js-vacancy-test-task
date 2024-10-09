import { Inter } from 'next/font/google';
import { colorsTuple, createTheme, DEFAULT_THEME } from '@mantine/core';

import * as components from './components';

const inter = Inter({ subsets: ['latin'] });

const theme = createTheme({
  fontFamily: inter.style.fontFamily,
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  headings: {
    fontFamily: `${inter.style.fontFamily}, ${DEFAULT_THEME.fontFamily}`,
    fontWeight: '600',
  },
  primaryColor: 'blue-600',
  colors: {
    'black-50': colorsTuple('#FCFCFC'),
    'black-100': colorsTuple('#ECECEE'),
    'black-200': colorsTuple('#CFCFCF'),
    'black-300': colorsTuple('#A3A3A3'),
    'black-400': colorsTuple('#767676'),
    'black-500': colorsTuple('#717171'),
    'black-600': colorsTuple('#201F22'),
    'blue-10': colorsTuple('#EAF1FD'),
    'blue-500': colorsTuple('#5692EF'),
    'blue-600': colorsTuple('#2B77EB'),
    'blue-700': colorsTuple('#235FBC'),
  },
  components,
});

export default theme;
