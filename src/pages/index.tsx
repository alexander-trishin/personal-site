import type { GetStaticProps } from 'next';

import { Box } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { PropsWithoutRef, useEffect, useState } from 'react';

import useStyles from 'client/assets/styles/pages/home';
import { Footer, Header, SearchEngineOptimization } from 'client/components';
import { getMessages } from 'client/i18n';

type IndexPageProps = {
    millisecondsToRelease: number;
};

const stringify = (value: number) => String(Math.floor(value)).padStart(2, '0');

const getDays = (value: number) => stringify(value / (1000 * 60 * 60 * 24));
const getHours = (value: number) => stringify((value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
const getMinutes = (value: number) => stringify((value % (1000 * 60 * 60)) / (1000 * 60));
const getSeconds = (value: number) => stringify((value % (1000 * 60)) / 1000);

const IndexPage = (props: PropsWithoutRef<IndexPageProps>) => {
    const { millisecondsToRelease } = props;

    const { classes } = useStyles();
    const t = useTranslations('shared');

    const [distance, setDistance] = useState(millisecondsToRelease);
    const [days, setDays] = useState(() => getDays(distance));
    const [hours, setHours] = useState(() => getHours(distance));
    const [minutes, setMinutes] = useState(() => getMinutes(distance));
    const [seconds, setSeconds] = useState(() => getSeconds(distance));

    useEffect(() => {
        const updateDistance = () => {
            setDistance(prevDistance =>
                prevDistance > 0
                    ? new Date(2022, 6, 1).getTime() - new Date().getTime()
                    : prevDistance
            );

            setTimeout(updateDistance, 1000);
        };

        updateDistance();
    }, []);

    useEffect(() => {
        if (distance > 0) {
            setDays(getDays(distance));
            setHours(getHours(distance));
            setMinutes(getMinutes(distance));
            setSeconds(getSeconds(distance));
        }
    }, [distance]);

    return (
        <Box className={classes.root}>
            <SearchEngineOptimization title={t('author')} />

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
            millisecondsToRelease: Math.max(
                new Date(Date.UTC(2022, 6, 1)).getTime() - new Date().getTime(),
                0
            ),
            messages: await getMessages(locale, ['shared', 'social'])
        }
    };
};

export default IndexPage;
