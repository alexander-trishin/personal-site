import { z } from 'zod';

import { createController, HttpAction } from 'server/api';
import { sendEmail } from 'server/email';
import { validateCsrfTokenMiddleware } from 'server/middleware';
import { HttpStatus } from 'shared/constants';
import { trim } from 'shared/utils/string';

const controller = createController(server => {
    const postSchema = z.object({
        body: z.object({
            name: z.optional(z.preprocess(trim, z.string().max(64))),
            email: z.preprocess(trim, z.string().min(5).max(64).email()),
            subject: z.preprocess(trim, z.string().min(1).max(128)),
            message: z.preprocess(trim, z.string().min(8).max(2048))
        })
    });

    const postHandler: HttpAction = async (request, response) => {
        const {
            body: { name, email, subject, message }
        } = await postSchema.parseAsync(request);

        await sendEmail({
            to: process.env.NEXT_PUBLIC_AUTHOR_EMAIL,
            subject,
            html: `<div><p>From: ${name ? `&lt;${name}&gt; ` : ''}${email}</p><p>${message}</p></div>`
        });

        response.status(HttpStatus.Code204NoContent).end();
    };

    server.use(validateCsrfTokenMiddleware).post(postHandler);
});

export default controller;
