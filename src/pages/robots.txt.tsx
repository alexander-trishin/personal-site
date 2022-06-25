import type { GetServerSideProps } from 'next';

import { EOL } from 'os';

import { HeaderName, MimeType } from 'shared/constants';
import { getBaseUrl } from 'shared/utils/url';

const RobotsTxt = () => null;

export const getServerSideProps: GetServerSideProps = async context => {
    const { res: response } = context;

    const robots = [
        'User-agent: *',
        'Allow: /*',
        '',
        'Disallow: /api/*',
        '',
        `Sitemap: ${getBaseUrl()}/sitemap.xml`,
        ''
    ];

    response
        .setHeader(HeaderName.CacheControl, `public, s-maxage=${24 * 60 * 60}`)
        .setHeader(HeaderName.ContentType, MimeType.TextPlain);

    response.write(robots.join(EOL));
    response.end();

    return { props: {} };
};

export default RobotsTxt;
