import type { ColorScheme } from '@mantine/core';
import type { PropsWithoutRef } from 'react';

import Head from 'next/head';

type HeadFaviconProps = { colorScheme?: ColorScheme };

const Favicon = (props: PropsWithoutRef<HeadFaviconProps>) => {
    const { colorScheme } = props;

    const suffix = colorScheme === 'dark' ? '-dark' : '';

    const makeHref = (fileName: string, extension = 'png') => {
        return `/static/favicon/${fileName}${suffix}.${extension}`;
    };

    return (
        <Head>
            <link rel="apple-touch-icon" sizes="180x180" href={makeHref('apple-touch-icon')} />
            <link rel="icon" type="image/png" sizes="32x32" href={makeHref('favicon-32x32')} />
            <link rel="icon" type="image/png" sizes="16x16" href={makeHref('favicon-16x16')} />
            <link rel="icon" href={makeHref('favicon', 'ico')} />
        </Head>
    );
};

export default Favicon;
