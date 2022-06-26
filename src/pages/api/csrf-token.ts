import { createController, HttpAction } from 'server/api';
import { createCsrfToken, decodeCsrfTokenCookie } from 'server/security';
import { CookieName, HttpStatus } from 'shared/constants';
import { GetCsrfTokenResponse } from 'shared/models/csrf-token';
import { getCookie, setCookie } from 'shared/utils/cookie';

const controller = createController(server => {
    const getHandler: HttpAction<GetCsrfTokenResponse> = async (request, response) => {
        const csrfTokenFromCookie = getCookie<string | null | undefined>(CookieName.CsrfToken, {
            req: request
        });

        if (csrfTokenFromCookie) {
            const csrfToken = await decodeCsrfTokenCookie(csrfTokenFromCookie);

            response.status(HttpStatus.Code200OK).json({ csrfToken });
            return;
        }

        const { csrfToken, csrfTokenCookie } = await createCsrfToken();

        setCookie(CookieName.CsrfToken, csrfTokenCookie, {
            req: request,
            res: response,
            httpOnly: true,
            secure: true
        });

        response.status(HttpStatus.Code200OK).json({ csrfToken });
    };

    server.get(getHandler);
});

export default controller;
