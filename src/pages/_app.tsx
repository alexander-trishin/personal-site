import type { AppProps as NextAppProps } from 'next/app';

import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { AbstractIntlMessages, NextIntlProvider } from 'next-intl';
import Head from 'next/head';

interface PageProps {
    messages?: AbstractIntlMessages;
}

interface AppProps extends Omit<NextAppProps, 'pageProps'> {
    pageProps: PageProps;
}

const App = (props: AppProps) => {
    const { Component, pageProps } = props;
    const { messages } = pageProps;

    return (
        <>
            <Head>
                <title>Alexander Trishin</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>

            <NextIntlProvider messages={messages}>
                <MantineProvider withNormalizeCSS withGlobalStyles>
                    <NotificationsProvider>
                        <Component {...(pageProps as NextAppProps['pageProps'])} />
                    </NotificationsProvider>
                </MantineProvider>
            </NextIntlProvider>
        </>
    );
};

export default App;
