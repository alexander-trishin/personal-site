import ky from 'ky-universal';

import { GetCsrfTokenResponse } from 'shared/models/csrf-token';
import { getBaseUrl } from 'shared/utils/url';

const getCsrfToken = () => {
    return ky.get('/api/csrf-token', { prefixUrl: getBaseUrl() }).json<GetCsrfTokenResponse>();
};

export default getCsrfToken;
