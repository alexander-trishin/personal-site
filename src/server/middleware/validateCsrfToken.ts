import type { NextApiRequest } from 'next';

import { z } from 'zod';

import { HttpMiddleware } from 'server/api';
import { validateCsrfToken } from 'server/security';
import { CookieName, HttpMethod, HttpStatus } from 'shared/constants';
import { ProblemDetails } from 'shared/models/api';
import { getCookie } from 'shared/utils/cookie';

const shouldValidate = (request: NextApiRequest) => {
    return [HttpMethod.Get, HttpMethod.Head, HttpMethod.Options].every(
        method => method !== request.method
    );
};

const validateCsrfTokenMiddleware: HttpMiddleware<ProblemDetails> = async (
    request,
    response,
    next
) => {
    if (shouldValidate(request)) {
        const schema = z.object({
            body: z.object({
                csrfToken: z.string()
            })
        });

        const {
            body: { csrfToken: csrfTokenFromBody }
        } = await schema.parseAsync(request);

        const csrfTokenFromCookie = getCookie<string | null | undefined>(CookieName.CsrfToken, {
            req: request
        });

        if (!(await validateCsrfToken(csrfTokenFromBody, csrfTokenFromCookie))) {
            response.status(HttpStatus.Code400BadRequest).json({
                message: 'Invalid CSRF Token'
            });

            return;
        }
    }

    next();
};

export default validateCsrfTokenMiddleware;
