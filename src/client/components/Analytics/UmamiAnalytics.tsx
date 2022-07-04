import { useWindowEvent } from '@mantine/hooks';
import Script from 'next/script';
import { useRef } from 'react';

const UmamiAnalytics = () => {
    const prodRef = useRef(process.env.NODE_ENV === 'production');

    useWindowEvent('click', event => {
        const { target } = event;

        if (!prodRef.current || !(target instanceof Element)) {
            return;
        }

        const a = target.closest('a');

        if (a) {
            const { href, textContent, title } = a;

            umami?.trackEvent(title ?? textContent ?? href, event.type);
            return;
        }

        const button = target.closest('button');

        if (button) {
            const { id, name, textContent, title } = button;

            umami?.trackEvent(title ?? textContent ?? name ?? id, event.type);
            return;
        }
    });

    if (!prodRef.current) {
        return null;
    }

    return (
        <Script
            strategy="lazyOnload"
            src={process.env.NEXT_PUBLIC_ANALYTICS_UMAMI_URL}
            data-website-id={process.env.NEXT_PUBLIC_ANALYTICS_UMAMI_ID}
        />
    );
};

export default UmamiAnalytics;
