import type { ServerOptions } from 'https';

import fs from 'fs';
import path from 'path';

const certificatesFolder = path.resolve('./certificates');

const certPath = path.resolve(certificatesFolder, 'dev.crt');
const keyPath = path.resolve(certificatesFolder, 'dev.key');

const httpsOptions: ServerOptions = {
    cert: fs.readFileSync(certPath),
    key: fs.readFileSync(keyPath)
};

export default httpsOptions;
