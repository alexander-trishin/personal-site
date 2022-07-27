import type { MantineThemeOverride } from '@mantine/core';

import { colors } from './theme.colors';
import { clamp, getPrimaryColor } from './theme.other';

const components: Required<MantineThemeOverride>['components'] = {
    Container: {
        defaultProps: {
            sizes: {
                xs: 556,
                sm: 720,
                md: 896,
                lg: 1120,
                xl: 1236
            }
        }
    }
};

const theme: MantineThemeOverride = {
    breakpoints: {
        xs: 576,
        sm: 768,
        md: 992,
        lg: 1200,
        xl: 1400
    },

    colors,
    colorScheme: 'light',

    components,

    primaryColor: 'violet',
    primaryShade: {
        light: 6,
        dark: 5
    },

    defaultRadius: 'sm',

    fontFamily:
        'Mulish, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',

    fontSizes: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 18,
        xl: 20
    },

    headings: {
        fontFamily:
            'Poppins, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
        fontWeight: 700,
        sizes: {
            h1: { fontSize: clamp(42, 84), lineHeight: 1.075 },
            h2: { fontSize: clamp(24, 48), lineHeight: 1.355 },
            h3: { fontSize: clamp(20, 36), lineHeight: 1.25 },
            h4: { fontSize: clamp(18, 30), lineHeight: 1.5 },
            h5: { fontSize: clamp(16, 20), lineHeight: 1.715 },
            h6: { fontSize: clamp(14, 16), lineHeight: 1.845 }
        }
    },

    spacing: {
        xs: 10,
        sm: 12,
        md: 16,
        lg: 20,
        xl: 24
    },

    other: {
        fn: {
            clamp,
            getPrimaryColor
        }
    }
};

export default theme;
