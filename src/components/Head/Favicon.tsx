import type { ColorScheme } from '@mantine/core';
import type { FC } from 'react';

type HeadFaviconProps = { colorScheme?: ColorScheme };

const Favicon: FC<HeadFaviconProps> = ({ colorScheme }) => {
    const suffix = colorScheme === 'dark' ? '-dark' : '';

    const makeHref = (fileName: string, extension = 'png') => {
        return `/static/favicon/${fileName}${suffix}.${extension}`;
    };

    return (
        <>
            <link rel="apple-touch-icon" sizes="180x180" href={makeHref('apple-touch-icon')} />
            <link rel="icon" type="image/png" sizes="32x32" href={makeHref('favicon-32x32')} />
            <link rel="icon" type="image/png" sizes="16x16" href={makeHref('favicon-16x16')} />
            <link rel="icon" href={makeHref('favicon', 'ico')} />
        </>
    );
};

export default Favicon;
