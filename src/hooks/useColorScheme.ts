import type { ColorScheme } from '@mantine/core';

import { Dispatch, useCallback, useState } from 'react';

import { BroadcastChannelName, CookieName } from 'common/constants';
import { BroadcastHandler, useBroadcast } from 'hooks';
import { setCookie } from 'utils/cookie';

const useColorScheme = (defaultValue: ColorScheme): [ColorScheme, Dispatch<ColorScheme>] => {
    const [colorScheme, setColorScheme] = useState(defaultValue);

    const syncColorScheme = useCallback<BroadcastHandler<ColorScheme>>(event => {
        event.preventDefault();

        setColorScheme(event.data);
    }, []);

    const broadcast = useBroadcast(BroadcastChannelName.ColorScheme, syncColorScheme);

    const toggleColorScheme = (value?: ColorScheme) => {
        const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');

        setColorScheme(nextColorScheme);
        setCookie(CookieName.ColorScheme, nextColorScheme, {
            sameSite: 'strict',
            secure: true,
            maxAge: 60 * 60 * 24 * 30 // 30 Days
        });

        broadcast(nextColorScheme);
    };

    return [colorScheme, toggleColorScheme];
};

export default useColorScheme;
