import type { NextApiHandler } from 'next';

import { SitemapStream, SitemapItem, EnumChangefreq } from 'sitemap';

import { HeaderName, HttpMethod, HttpStatus, MimeType } from 'common/constants';
import { pipeCompress } from 'server/utils/compression';
import { getBaseUrl } from 'utils/common/url';

const utcDateToIsoString = (year: number, month: number, day: number) => {
    return new Date(Date.UTC(year, month, day)).toISOString();
};

const StaticPages: Partial<SitemapItem>[] = [
    {
        url: '/',
        lastmod: utcDateToIsoString(2022, 5, 24),
        changefreq: EnumChangefreq.WEEKLY
    }
];

const handler: NextApiHandler = async (request, response) => {
    if (request.method === HttpMethod.Get) {
        const stream = new SitemapStream({
            hostname: getBaseUrl(),
            lastmodDateOnly: true,
            xmlns: {
                news: false,
                xhtml: false,
                image: false,
                video: false
            }
        });

        StaticPages.forEach(page => stream.write(page));

        stream.end();

        response.setHeader(HeaderName.ContentType, MimeType.TextXml);
        pipeCompress(stream, request, response);

        return;
    }

    response.status(HttpStatus.Code405MethodNotAllowed).end();
};

export default handler;
