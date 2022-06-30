import type { GetStaticProps } from 'next';

import { LoadingOverlay } from '@mantine/core';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import { getMessages } from 'client/i18n';

const Home = dynamic(() => import('client/pages/Home/Home'), { suspense: true });

const IndexPage = () => {
    return (
        <Suspense fallback={<LoadingOverlay visible />}>
            <Home />
        </Suspense>
    );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    const namespaces: Array<keyof IntlMessage> = [
        'home-about',
        'home-contact',
        'home-contact-form',
        'home-intro',
        'i18n',
        'shared',
        'social',
        'validation'
    ];

    return {
        props: {
            messages: await getMessages(locale, namespaces)
        }
    };
};

export default IndexPage;
