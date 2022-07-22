import type { GetStaticProps } from 'next';

import { Home } from 'client/pages';
import { getMessages } from 'shared/i18n';

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
