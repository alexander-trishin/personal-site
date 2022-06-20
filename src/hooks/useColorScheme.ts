import type { ColorScheme } from '@mantine/core';

import { Dispatch, useCallback, useEffect, useState } from 'react';

import { BroadcastChannelName, LocalStorageKey } from 'common/constants';
import { BroadcastHandler, useBroadcast } from 'hooks';
import { isClientSide } from 'utils/common/dom';

const useColorScheme = (): [ColorScheme, Dispatch<ColorScheme>] => {
    const [isRendered, setIsRendered] = useState(false);
    const [colorScheme, setColorScheme] = useState<ColorScheme>('light');

    useEffect(() => {
        if (isClientSide()) {
            setColorScheme(document.documentElement.dataset.theme as ColorScheme);
            setIsRendered(true);
        }
    }, []);

    useEffect(() => {
        if (isRendered) {
            document.documentElement.dataset.render = 'true';
        }
    }, [isRendered]);

    const syncColorScheme = useCallback<BroadcastHandler<ColorScheme>>(event => {
        event.preventDefault();

        setColorScheme(event.data);
        document.documentElement.dataset.theme = event.data;
    }, []);

    const broadcast = useBroadcast(BroadcastChannelName.ColorScheme, syncColorScheme);

    const toggleColorScheme = (value?: ColorScheme) => {
        const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');

        window.localStorage.setItem(LocalStorageKey.ColorScheme, nextColorScheme);
        document.documentElement.dataset.theme = nextColorScheme;

        setColorScheme(nextColorScheme);
        broadcast(nextColorScheme);
    };

    return [colorScheme, toggleColorScheme];
};

export default useColorScheme;
