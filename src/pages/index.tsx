import type { NextPage } from 'next';

import { useEffect, useState } from 'react';

import useStyles from 'styles/HomePage';

const HomePage: NextPage = () => {
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
        <div className={classes.root} data-test-id="HomePage">
            <div className={classes.label}>Coming Soon</div>
            <div className={classes.countdown}>
                <div className={classes.indicator}>
                    <div className={classes.number}>{days}</div>
                    <div className={classes.text}>Days</div>
                </div>
                <div className={classes.indicator}>
                    <div className={classes.number}>{hours}</div>
                    <div className={classes.text}>Hours</div>
                </div>
                <div className={classes.indicator}>
                    <div className={classes.number}>{minutes}</div>
                    <div className={classes.text}>Minutes</div>
                </div>
                <div className={classes.indicator}>
                    <div className={classes.number}>{seconds}</div>
                    <div className={classes.text}>Seconds</div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
