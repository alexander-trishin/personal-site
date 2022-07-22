import type { GetServerSidePropsContext } from 'next';
import type { Stream } from 'stream';

import { EnumChangefreq, SitemapItem, SitemapStream } from 'sitemap';

import { getBaseUrl } from 'shared/utils/url';

const utcDateToIsoString = (year: number, month: number, day: number) => {
    return new Date(Date.UTC(year, month - 1, day)).toISOString();
};

const StaticPages: Partial<SitemapItem>[] = [
    {
        url: '/',
        changefreq: EnumChangefreq.MONTHLY,
        lastmod: utcDateToIsoString(2022, 7, 22)
    }
];

const createSitemapXml = (
    locales: GetServerSidePropsContext['locales'],
    defaultLocale: GetServerSidePropsContext['defaultLocale']
): Stream => {
    const stream = new SitemapStream({
        hostname: getBaseUrl(),
        lastmodDateOnly: true,
        xmlns: {
            xhtml: true,
            image: false,
            video: false,
            news: false
        }
    });

    StaticPages.forEach(({ url, ...page }) =>
        stream.write({
            ...page,
            url,
            links: locales!.map(locale => ({
                lang: locale,
                url: locale === defaultLocale ? url : `/${locale}${url}`
            }))
        })
    );

    stream.end();

    return stream;
};

export default createSitemapXml;
