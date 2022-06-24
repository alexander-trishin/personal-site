import { GetStaticProps } from 'next';

import { Home } from 'client/components';
import { getMessages } from 'client/i18n';

const Dev = () => {
    return <Home />;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    if (process.env.NODE_ENV === 'production') {
        return {
            notFound: true
        };
    }

    return {
        props: {
            messages: await getMessages(locale)
        }
    };
};

export default Dev;
