import ky from 'ky-universal';

import { PostSendEmailBody } from 'shared/models/send-email';
import { getBaseUrl } from 'shared/utils/url';

const postSendEmail = async (body: PostSendEmailBody) => {
    await ky.post('/api/send-email', {
        prefixUrl: getBaseUrl(),
        json: body
    });
};

export default postSendEmail;
