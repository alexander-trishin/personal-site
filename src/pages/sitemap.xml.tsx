import type { GetServerSideProps } from 'next';

import { SitemapStream, SitemapItem, EnumChangefreq } from 'sitemap';

import { HeaderName, HttpStatus, MimeType } from 'shared/constants';
import { getBaseUrl } from 'shared/utils/url';

const SitemapXml = () => null;

const utcDateToIsoString = (year: number, month: number, day: number) => {
    return new Date(Date.UTC(year, month - 1, day)).toISOString();
};

const StaticPages: Partial<SitemapItem>[] = [
    {
        url: '/',
        changefreq: EnumChangefreq.DAILY,
        lastmod: utcDateToIsoString(2022, 6, 25)
    }
];

export const getServerSideProps: GetServerSideProps = async context => {
    const { defaultLocale, locales, res: response } = context;

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

    response.writeHead(HttpStatus.Code200OK, {
        [HeaderName.CacheControl]: `public, s-maxage=${24 * 60 * 60}`,
        [HeaderName.ContentType]: MimeType.TextXml
    });

    await new Promise(resolve => {
        stream.pipe(response).on('end', resolve);
    });

    return { props: {} };
};

export default SitemapXml;
