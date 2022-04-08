import { ServerStyles, createStylesServer } from '@mantine/next';
import NextDocument, { DocumentContext, DocumentInitialProps } from 'next/document';

const serverStyles = createStylesServer();

class Document extends NextDocument {
    static async getInitialProps(context: DocumentContext): Promise<DocumentInitialProps> {
        const initialProps = await NextDocument.getInitialProps(context);

        return {
            ...initialProps,
            styles: (
                <>
                    {initialProps.styles}
                    <ServerStyles html={initialProps.html} server={serverStyles} />
                </>
            )
        };
    }
}

export default Document;
