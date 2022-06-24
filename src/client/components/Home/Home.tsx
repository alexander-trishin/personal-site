import { useTranslations } from 'next-intl';

import { SearchEngineOptimization } from 'client/components';

import About from './About';
import BackToTopButton from './BackToTopButton';
import Contact from './Contact';
import FooterParallax from './FooterParallax';
import Header from './Header';
import Intro from './Intro';
import Main from './Main';

const links = [
    { label: 'Home', href: '#intro' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' }
];

const Home = () => {
    const t = useTranslations('shared');

    return (
        <>
            <SearchEngineOptimization title={t('author')} />

            <Header stackY={150} navLinks={links} />

            <Main>
                <Intro id="intro" showMoreHref="#about" />
                <About id="about" />
                <Contact id="contact" />
            </Main>

            <FooterParallax />
            <BackToTopButton href="#intro" />
        </>
    );
};

export default Home;
