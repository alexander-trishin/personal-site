import { Stream } from 'stream';
import { createBrotliCompress, createGzip } from 'zlib';

import { NextApiRequest, NextApiResponse } from 'next';

import { ContentEncoding, HeaderName } from 'common/constants';
import { logger } from 'utils/logging';

export const pipeCompress = (
    stream: Stream,
    request: NextApiRequest,
    response: NextApiResponse
) => {
    const encoding = request.headers[HeaderName.AcceptEncoding.toLowerCase()];

    let pipeline = stream;

    if (typeof encoding === 'string') {
        if (encoding.includes(ContentEncoding.Brotli)) {
            response.setHeader(HeaderName.ContentEncoding, ContentEncoding.Brotli);

            pipeline = stream.pipe(createBrotliCompress());
        } else if (encoding.includes(ContentEncoding.GZip)) {
            response.setHeader(HeaderName.ContentEncoding, ContentEncoding.GZip);

            pipeline = stream.pipe(createGzip());
        }
    }

    pipeline.pipe(response).on('error', error => {
        logger.error(error);

        throw error;
    });
};
