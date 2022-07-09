import { useTranslations } from 'next-intl';

import { BackToTopButton, SearchEngineOptimization } from 'client/components';

import About from './About';
import Contact from './Contact';
import FooterParallax from './FooterParallax';
import Header from './Header';
import { useContactForm } from './Home.utils';
import Intro from './Intro';
import Main from './Main';

const Home = () => {
    const t = useTranslations();

    const links = [
        { label: t('home-intro.caption'), href: '#intro' },
        { label: t('home-about.caption'), href: '#about' },
        { label: t('home-contact.caption'), href: '#contact' }
    ];

    const [handleSubmitContact, isContactSubmitting] = useContactForm();

    return (
        <>
            <SearchEngineOptimization title={t('home.title')} description={t('home.description')} />

            <Header stackY={150} navLinks={links} />

            <Main>
                <Intro id="intro" showMoreHref="#about" />
                <About id="about" />
                <Contact
                    id="contact"
                    isSubmitting={isContactSubmitting}
                    onSubmit={handleSubmitContact}
                />
            </Main>

            <FooterParallax />
            <BackToTopButton href="#intro" />
        </>
    );
};

export default Home;
