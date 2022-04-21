import { createServer } from 'https';
import { parse } from 'url';

import next from 'next';

import { dev, hostname, port } from './environment';
import httpsOptions from './https-options';

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    createServer(httpsOptions, async (request, response) => {
        const parsedUrl = parse(request.url!, true);

        await handle(request, response, parsedUrl);
    }).listen(port, () => {
        console.log(`> Ready on https://${hostname}:${port}`);
    });
});
