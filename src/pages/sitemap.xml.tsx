import type { GetServerSideProps } from 'next';

import { createSitemapXml } from 'server/utils/seo';
import { HeaderName, HttpStatus, MimeType } from 'shared/constants';

const SitemapXml = () => null;

export const getServerSideProps: GetServerSideProps = async context => {
    const { defaultLocale, locales, res: response } = context;

    const sitemap = createSitemapXml(locales, defaultLocale);

    response.writeHead(HttpStatus.Code200OK, {
        [HeaderName.CacheControl]: `public, s-maxage=${24 * 60 * 60}`,
        [HeaderName.ContentType]: MimeType.TextXml
    });

    await new Promise(resolve => {
        sitemap.pipe(response).on('end', resolve);
    });

    return { props: {} };
};

export default SitemapXml;
