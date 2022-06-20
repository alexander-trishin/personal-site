import type { AppProps as NextAppProps } from 'next/app';

import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { AbstractIntlMessages, NextIntlProvider } from 'next-intl';
import Head from 'next/head';
import { useState } from 'react';
import { Hydrate as ReactQueryHydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { mantineDefaultProps, mantineTheme } from 'common/theme';
import { Favicon } from 'components';
import { useColorScheme } from 'hooks';

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
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
                <meta name="color-scheme" content="dark light" />
                <Favicon colorScheme={colorScheme} />
            </Head>

            <NextIntlProvider messages={messages}>
                <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={setColorScheme}>
                    <MantineProvider
                        defaultProps={mantineDefaultProps}
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
        </>
    );
};

export default App;
