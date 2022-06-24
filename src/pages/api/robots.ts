import type { NextApiHandler } from 'next';

import { EOL } from 'os';
import { Readable } from 'stream';

import { pipeCompress } from 'server/utils/compression';
import { HeaderName, HttpMethod, HttpStatus, MimeType } from 'shared/constants';
import { getBaseUrl } from 'shared/utils/url';

const handler: NextApiHandler = async (request, response) => {
    if (request.method === HttpMethod.Get) {
        const robots = [
            'User-agent: *',
            'Allow: /*',
            '',
            'Disallow: /api/*',
            '',
            `Sitemap: ${getBaseUrl()}/sitemap.xml`
        ];

        const stream = Readable.from(robots.join(EOL), { objectMode: false });

        response.setHeader(HeaderName.ContentType, MimeType.TextPlain);
        pipeCompress(stream, request, response);

        return;
    }

    response.status(HttpStatus.Code405MethodNotAllowed).end();
};

export default handler;
