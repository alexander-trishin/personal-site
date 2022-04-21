import type { ColorScheme } from '@mantine/core';

import { useColorScheme } from '@mantine/hooks';
import { setCookies } from 'cookies-next';
import { useState } from 'react';

import { CookieNames } from 'common/cookies';

const useCookieColorScheme = (
    cookieName: CookieNames,
    colorSchemeFromProps?: ColorScheme
): [ColorScheme, (value?: ColorScheme) => void] => {
    const preferredColorScheme = useColorScheme();

    const [colorScheme, setColorScheme] = useState<ColorScheme>(
        colorSchemeFromProps || preferredColorScheme
    );

    const toggleColorScheme = (value?: ColorScheme) => {
        const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');

        setColorScheme(nextColorScheme);
        setCookies(cookieName, nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
    };

    return [colorScheme, toggleColorScheme];
};

export default useCookieColorScheme;
