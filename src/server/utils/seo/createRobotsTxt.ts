import { EOL } from 'os';

import { getBaseUrl } from 'shared/utils/url';

const createRobotsTxt = () => {
    const robots = [
        'User-agent: *',
        'Allow: /*',
        '',
        'Disallow: /api/*',
        '',
        `Sitemap: ${getBaseUrl()}/sitemap.xml`,
        ''
    ];

    return robots.join(EOL);
};

export default createRobotsTxt;
