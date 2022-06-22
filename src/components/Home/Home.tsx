import { Box } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { SearchEngineOptimization } from 'components';

import BackToTopButton from './BackToTopButton';
import Contact from './Contact';
import Footer from './Footer';
import Header from './Header';
import Intro from './Intro';

const links = [
    { label: 'Home', href: '#intro' },
    { label: 'Contact', href: '#contact' }
];

const Home = () => {
    const t = useTranslations('shared');

    return (
        <>
            <SearchEngineOptimization title={t('author')} />

            <Header stackY={150} navLinks={links} />

            <Box component="main">
                <Intro id="intro" />
                <Contact id="contact" />
            </Box>

            <Footer />
            <BackToTopButton href="#intro" />
        </>
    );
};

export default Home;
