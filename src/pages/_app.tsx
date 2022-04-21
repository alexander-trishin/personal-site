import type { GetServerSidePropsContext } from 'next';
import type { AppProps as NextAppProps } from 'next/app';

import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { getCookie } from 'cookies-next';
import { AbstractIntlMessages, NextIntlProvider } from 'next-intl';
import Head from 'next/head';

import { CookieNames } from 'common/cookies';
import { HeadFavicon } from 'components';
import { useCookieColorScheme } from 'utils/hooks';

interface PageProps {
    messages?: AbstractIntlMessages;
}

interface AppProps extends Omit<NextAppProps, 'pageProps'> {
    colorScheme?: ColorScheme;
    pageProps: PageProps;
}

const App = (props: AppProps) => {
    const { Component, pageProps, colorScheme: colorSchemeFromProps } = props;
    const { messages } = pageProps;

    const [colorScheme, setColorScheme] = useCookieColorScheme(
        CookieNames.ColorScheme,
        colorSchemeFromProps
    );

    return (
        <>
            <Head>
                <title>Alexander Trishin</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
                <HeadFavicon colorScheme={colorScheme} />
            </Head>

            <NextIntlProvider messages={messages}>
                <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={setColorScheme}>
                    <MantineProvider theme={{ colorScheme }} withNormalizeCSS withGlobalStyles>
                        <NotificationsProvider>
                            <Component {...(pageProps as NextAppProps['pageProps'])} />
                        </NotificationsProvider>
                    </MantineProvider>
                </ColorSchemeProvider>
            </NextIntlProvider>
        </>
    );
};

App.getInitialProps = async (context: GetServerSidePropsContext) => {
    return {
        colorScheme: getCookie(CookieNames.ColorScheme, context)
    };
};

export default App;
