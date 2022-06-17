import { createServer } from 'https';
import { parse } from 'url';

import next from 'next';
import color from 'picocolors';

import { dev, hostname, port } from './environment';
import httpsOptions from './https-options';

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

(async () => {
    try {
        await app.prepare();

        const server = createServer(httpsOptions, async (request, response) => {
            const parsedUrl = parse(request.url!, true);

            await handle(request, response, parsedUrl);
        });

        server.listen(port, () => {
            console.log(color.green(`> Ready on https://${hostname}:${port}`));
        });
    } catch (error) {
        console.log(color.red(JSON.stringify(error, null, 4)));
    }
})();
