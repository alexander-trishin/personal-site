import { createGetInitialProps } from '@mantine/next';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

const getInitialProps = createGetInitialProps();

class Document extends NextDocument {
    static getInitialProps = getInitialProps;

    render() {
        const { locale } = this.props;

        return (
            <Html lang={locale}>
                <Head>
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
