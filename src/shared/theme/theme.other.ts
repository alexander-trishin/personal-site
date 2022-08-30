interface ClampOptions {
    baseFontSizeInPx?: number;
    minViewportInPx?: number;
    maxViewportInPx?: number;
}

type Clamp = (minFontSizeInPx: number, maxFontSizeInPx: number, options?: ClampOptions) => string;

interface ThemeOtherFn {
    clamp: Clamp;
}

export interface ThemeOther {
    fn: ThemeOtherFn;
}

export const clamp: Clamp = (minFontSizeInPx, maxFontSizeInPx, options) => {
    const { baseFontSizeInPx = 16, minViewportInPx = 576, maxViewportInPx = 1400 } = options ?? {};

    const minFontSizeInRem = minFontSizeInPx / baseFontSizeInPx;

    const fontDifferenceInPx = `${maxFontSizeInPx} - ${minFontSizeInPx}`;
    const viewportDifferenceInPx = `${maxViewportInPx} - ${minViewportInPx}`;

    const calc = `${minFontSizeInRem}rem + (${fontDifferenceInPx}) * ((100vw - ${minViewportInPx}px) / (${viewportDifferenceInPx}))`;

    return `clamp(${minFontSizeInPx}px, calc(${calc}), ${maxFontSizeInPx}px)`;
};
