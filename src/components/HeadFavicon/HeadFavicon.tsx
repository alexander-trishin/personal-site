import type { ColorScheme } from '@mantine/core';
import type { PropsWithoutRef } from 'react';

interface HeadFaviconProps {
    colorScheme?: ColorScheme;
}

const HeadFavicon = (props: PropsWithoutRef<HeadFaviconProps>) => {
    const { colorScheme } = props;

    if (colorScheme === 'dark') {
        return (
            <>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-dark-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-dark-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-dark-16x16.png" />
            </>
        );
    }

    return (
        <>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        </>
    );
};

export default HeadFavicon;
