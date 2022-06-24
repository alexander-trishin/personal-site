import type { MantineTheme } from '@mantine/core';

type ClampOptions = {
    baseFontSizeInPx?: number;
    minViewportInPx?: number;
    maxViewportInPx?: number;
};

type Clamp = (minFontSizeInPx: number, maxFontSizeInPx: number, options?: ClampOptions) => string;
type GetPrimaryColor = (theme: MantineTheme, shade?: number) => string;

type ThemeOtherFn = {
    clamp: Clamp;
    getPrimaryColor: GetPrimaryColor;
};

export type ThemeOther = {
    fn: ThemeOtherFn;
};

export const clamp: Clamp = (minFontSizeInPx, maxFontSizeInPx, options) => {
    const { baseFontSizeInPx = 16, minViewportInPx = 576, maxViewportInPx = 1400 } = options ?? {};

    const minFontSizeInRem = minFontSizeInPx / baseFontSizeInPx;

    const fontDifferenceInPx = `${maxFontSizeInPx} - ${minFontSizeInPx}`;
    const viewportDifferenceInPx = `${maxViewportInPx} - ${minViewportInPx}`;

    const calc = `${minFontSizeInRem}rem + (${fontDifferenceInPx}) * ((100vw - ${minViewportInPx}px) / (${viewportDifferenceInPx}))`;

    return `clamp(${minFontSizeInPx}px, calc(${calc}), ${maxFontSizeInPx}px)`;
};

export const getPrimaryColor = (theme: MantineTheme, shade?: number) => {
    const primaryShade =
        typeof shade === 'number'
            ? shade
            : typeof theme.primaryShade === 'object'
            ? theme.primaryShade[theme.colorScheme]
            : theme.primaryShade;

    return theme.colors[theme.primaryColor][primaryShade];
};
