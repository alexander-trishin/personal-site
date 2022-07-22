import type { GetStaticProps } from 'next';

import { getMessages } from 'client/i18n';
import { Home } from 'client/pages';

const IndexPage = () => {
    return <Home />;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    const namespaces: Array<keyof IntlMessages> = [
        'home',
        'home-about',
        'home-contact',
        'home-contact-form',
        'home-intro',
        'i18n',
        'shared',
        'social',
        'validation'
    ];

    return {
        props: {
            messages: await getMessages(locale, namespaces)
        }
    };
};

export default IndexPage;
