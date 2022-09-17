import { useWindowEvent } from '@mantine/hooks';
import Script from 'next/script';
import { useRef } from 'react';

const getEventData = (element: HTMLAnchorElement | HTMLButtonElement) => {
    const { id, innerText, name, textContent, title } = element;

    const text = textContent || innerText;

    return {
        ...(id && { id }),
        ...(name && { name }),
        ...(text && { text }),
        ...(title && { title })
    };
};

const UmamiAnalytics = () => {
    const prodRef = useRef(process.env.NODE_ENV === 'production');

    useWindowEvent('click', event => {
        const { target } = event;

        if (!prodRef.current || !(target instanceof Element)) {
            return;
        }

        const a = target.closest('a');

        if (a) {
            const { href } = a;

            umami?.trackEvent('Anchor click', { href, ...getEventData(a) });
            return;
        }

        const button = target.closest('button');

        if (button) {
            umami?.trackEvent('Button click', getEventData(button));
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
