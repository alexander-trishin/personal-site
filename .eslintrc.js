const fs = require('fs');
const path = require('path');

const appFolder = fs.realpathSync(process.cwd());
const srcFolder = path.resolve(appFolder, 'src');

const pathGroupGlobs = ['', '/**'];
const pathGroups = fs.readdirSync(srcFolder, { withFileTypes: true }).reduce((result, dirent) => {
    if (dirent.isDirectory()) {
        pathGroupGlobs.forEach(glob =>
            result.push({
                pattern: `${dirent.name}${glob}`,
                group: 'unknown'
            })
        );
    }

    return result;
}, []);

module.exports = {
    extends: ['next/core-web-vitals', 'prettier'],
    rules: {
        'import/order': [
            'error',
            {
                groups: [
                    'type',
                    'builtin',
                    'external',
                    'internal',
                    'unknown',
                    ['parent', 'sibling', 'index', 'object']
                ],
                pathGroups,
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true
                }
            }
        ]
    }
};
