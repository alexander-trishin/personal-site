import type { GetServerSideProps } from 'next';

import { createRobotsTxt } from 'server/utils/seo';
import { HeaderName, MimeType } from 'shared/constants';

const RobotsTxt = () => null;

export const getServerSideProps: GetServerSideProps = async context => {
    const { res: response } = context;

    const robots = createRobotsTxt();

    response
        .setHeader(HeaderName.CacheControl, `public, s-maxage=${24 * 60 * 60}`)
        .setHeader(HeaderName.ContentType, MimeType.TextPlain);

    response.write(robots);
    response.end();

    return { props: {} };
};

export default RobotsTxt;
