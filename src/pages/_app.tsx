import type { AppContext as NextAppContext, AppProps as NextAppProps } from 'next/app';

import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { AbstractIntlMessages, NextIntlProvider } from 'next-intl';
import Head from 'next/head';
import { useMemo } from 'react';
import { Hydrate as ReactQueryHydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { CookieName } from 'common/constants';
import { mantineDefaultProps, mantineTheme } from 'common/theme';
import { Favicon } from 'components';
import { useColorScheme } from 'hooks';
import { getCookie } from 'utils/cookie';

interface PageProps {
    dehydratedState?: unknown;
    messages?: AbstractIntlMessages;
}

interface AppProps extends Omit<NextAppProps, 'pageProps'> {
    colorScheme: ColorScheme;
    pageProps: PageProps;
}

const App = (props: AppProps) => {
    const { Component, pageProps, colorScheme: colorSchemeFromProps } = props;
    const { messages } = pageProps;

    const [colorScheme, setColorScheme] = useColorScheme(colorSchemeFromProps);

    const queryClient = useMemo(() => new QueryClient(), []);

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

App.getInitialProps = async (context: NextAppContext) => {
    return {
        colorScheme: getCookie<ColorScheme>(CookieName.ColorScheme, context.ctx) || 'light'
    };
};

export default App;
