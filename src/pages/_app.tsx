import type { AppProps as NextAppProps } from 'next/app';

import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { AbstractIntlMessages, NextIntlProvider } from 'next-intl';
import Head from 'next/head';
import { useState } from 'react';
import { Hydrate as ReactQueryHydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { Favicon, UmamiAnalytics } from 'client/components';
import { useColorScheme } from 'client/hooks';
import { mantineTheme, mantineThemeCache } from 'shared/theme';

import 'client/assets/styles/global.css';

interface PageProps {
    dehydratedState?: unknown;
    messages?: AbstractIntlMessages;
}

interface AppProps extends Omit<NextAppProps, 'pageProps'> {
    pageProps: PageProps;
}

const App = (props: AppProps) => {
    const { Component, pageProps } = props;
    const { messages } = pageProps;

    const [colorScheme, setColorScheme] = useColorScheme();
    const [queryClient] = useState(() => new QueryClient());

    return (
        <>
            <Head>
                <meta
                    key="viewport"
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
                <meta key="color-sheme" name="color-scheme" content="dark light" />
            </Head>

            <Favicon colorScheme={colorScheme} />

            <NextIntlProvider messages={messages}>
                <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={setColorScheme}>
                    <MantineProvider
                        emotionCache={mantineThemeCache}
                        theme={{ ...mantineTheme, colorScheme }}
                        withCSSVariables
                        withNormalizeCSS
                        withGlobalStyles
                    >
                        <NotificationsProvider>
                            <QueryClientProvider client={queryClient}>
                                <ReactQueryDevtools initialIsOpen={false} />
                                <ReactQueryHydrate state={pageProps.dehydratedState}>
                                    <Component {...(pageProps as NextAppProps['pageProps'])} />
                                </ReactQueryHydrate>
                            </QueryClientProvider>
                        </NotificationsProvider>
                    </MantineProvider>
                </ColorSchemeProvider>
            </NextIntlProvider>

            <UmamiAnalytics />
        </>
    );
};

export default App;
