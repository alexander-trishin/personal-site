import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';

import { getMessages } from 'client/i18n';

const Home = dynamic(() => import('client/pages/Home/Home'), {
    ssr: process.env.NODE_ENV !== 'production'
});

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
