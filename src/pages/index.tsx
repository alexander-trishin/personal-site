import type { GetStaticProps } from 'next';

import { Box } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import useStyles from 'assets/styles/pages/home';
import Footer from 'components/Home/Footer';
import Header from 'components/Home/Header';
import { getMessages } from 'i18n';

const IndexPage = () => {
    const t = useTranslations('shared');

    const { classes } = useStyles();

    const [days, setDays] = useState('00');
    const [hours, setHours] = useState('00');
    const [minutes, setMinutes] = useState('00');
    const [seconds, setSeconds] = useState('00');

    useEffect(() => {
        const updateTimer = () => {
            const distance = new Date(2022, 6, 1).getTime() - new Date().getTime();

            if (distance < 0) return;

            const stringify = (value: number) => String(Math.floor(value)).padStart(2, '0');

            setDays(stringify(distance / (1000 * 60 * 60 * 24)));
            setHours(stringify((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
            setMinutes(stringify((distance % (1000 * 60 * 60)) / (1000 * 60)));
            setSeconds(stringify((distance % (1000 * 60)) / 1000));

            setTimeout(updateTimer, 1000);
        };

        updateTimer();
    }, []);

    return (
        <Box className={classes.root}>
            <Head>
                <title>{`${t('author.first-name')} ${t('author.last-name')}`}</title>
            </Head>

            <Header />

            <Box component="main">
                <Box className={classes.label}>{t('coming-soon')}</Box>
                <Box className={classes.countdown}>
                    <Box className={classes.indicator}>
                        <Box className={classes.number}>{days}</Box>
                        <Box className={classes.text}>{t('days')}</Box>
                    </Box>
                    <Box className={classes.indicator}>
                        <Box className={classes.number}>{hours}</Box>
                        <Box className={classes.text}>{t('hours')}</Box>
                    </Box>
                    <Box className={classes.indicator}>
                        <Box className={classes.number}>{minutes}</Box>
                        <Box className={classes.text}>{t('minutes')}</Box>
                    </Box>
                    <Box className={classes.indicator}>
                        <Box className={classes.number}>{seconds}</Box>
                        <Box className={classes.text}>{t('seconds')}</Box>
                    </Box>
                </Box>
            </Box>

            <Footer />
        </Box>
    );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            messages: await getMessages(locale, ['shared'])
        }
    };
};

export default IndexPage;
