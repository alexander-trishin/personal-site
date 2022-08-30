import {
    NavigationProgress,
    resetNavigationProgress,
    startNavigationProgress
} from '@mantine/nprogress';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

const RouterNavigationProgress = () => {
    const { asPath, events } = useRouter();

    const eventsRef = useRef(events);
    eventsRef.current = events;

    useEffect(() => {
        const handleStart = (url: string) => url !== asPath && startNavigationProgress();
        const handleEnd = () => resetNavigationProgress();

        const { on, off } = eventsRef.current;

        on('routeChangeStart', handleStart);
        on('routeChangeComplete', handleEnd);
        on('routeChangeError', handleEnd);

        return () => {
            off('routeChangeStart', handleStart);
            off('routeChangeComplete', handleEnd);
            off('routeChangeError', handleEnd);
        };
    }, [asPath]);

    return <NavigationProgress />;
};

export default RouterNavigationProgress;
