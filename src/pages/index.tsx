import type { GetStaticProps, NextPage } from 'next';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { Header } from 'components';
import { getMessages } from 'i18n';
import useStyles from 'styles/HomePage';

const IndexPage: NextPage = () => {
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
        <>
            <Header />
            <main className={classes.root} data-test-id="HomePage">
                <div className={classes.label}>{t('coming-soon')}</div>
                <div className={classes.countdown}>
                    <div className={classes.indicator}>
                        <div className={classes.number}>{days}</div>
                        <div className={classes.text}>{t('days')}</div>
                    </div>
                    <div className={classes.indicator}>
                        <div className={classes.number}>{hours}</div>
                        <div className={classes.text}>{t('hours')}</div>
                    </div>
                    <div className={classes.indicator}>
                        <div className={classes.number}>{minutes}</div>
                        <div className={classes.text}>{t('minutes')}</div>
                    </div>
                    <div className={classes.indicator}>
                        <div className={classes.number}>{seconds}</div>
                        <div className={classes.text}>{t('seconds')}</div>
                    </div>
                </div>
            </main>
        </>
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
