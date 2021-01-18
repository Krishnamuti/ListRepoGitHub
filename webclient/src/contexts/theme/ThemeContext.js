import React from 'react';

import { ThemeProvider as ChakraThemeProvider, ColorModeProvider, CSSReset } from '@chakra-ui/react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';

import { customTheme } from '../../styles/theme';

const ThemeContext = React.FC = ({ children }) => (
    <ChakraThemeProvider theme={customTheme}>
        <EmotionThemeProvider theme={customTheme}>
            <CSSReset />
            {children}
        </EmotionThemeProvider>
    </ChakraThemeProvider>
);

export { ThemeContext };



