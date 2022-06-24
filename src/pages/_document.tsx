import { createGetInitialProps } from '@mantine/next';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

import { LocalStorageKey, ZIndex } from 'client/constants';

const getInitialProps = createGetInitialProps();

const script = `(function(){document.documentElement.dataset.theme=localStorage.getItem('${LocalStorageKey.ColorScheme}')||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')})()`;
const style = `body::before{content:'';display:block;position:fixed;inset:0;background:var(--at-body-bg-color);z-index:${ZIndex.Everything}}html[data-render] body::before{display:none} :root[data-theme='light']{--at-body-bg-color:var(--mantine-color-white)}:root[data-theme='dark'] {--at-body-bg-color:var(--mantine-color-dark-7)}`;
const noscript = `<style>body::before{content:none}</style>`;

class Document extends NextDocument {
    static getInitialProps = getInitialProps;

    render() {
        const { locale } = this.props;

        return (
            <Html lang={locale}>
                <Head>
                    <script key="theme-script" dangerouslySetInnerHTML={{ __html: script }} />
                    <style key="theme-style" dangerouslySetInnerHTML={{ __html: style }} />
                    <noscript key="theme-noscript" dangerouslySetInnerHTML={{ __html: noscript }} />

                    <link
                        href="https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200;0,300;0,400;1,400&display=swap"
                        rel="stylesheet"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,700;0,900;1,400&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default Document;
