import type { NextApiRequest, NextApiResponse } from 'next';

import connect, { ErrorHandler, NoMatchHandler } from 'next-connect';
import { ZodError } from 'zod';

import { HttpStatus } from 'shared/constants';
import { ProblemDetails } from 'shared/models/api';
import { logger } from 'shared/utils/logging';

import { Server } from './createController.types';

const onError: ErrorHandler<NextApiRequest, NextApiResponse<ProblemDetails>> = (
    error,
    _,
    response
) => {
    if (error instanceof ZodError) {
        response.status(HttpStatus.Code400BadRequest).json({
            message: 'One or more validation errors occurred',
            errors: error.issues
        });

        return;
    }

    logger.error(error);

    response
        .status(HttpStatus.Code500InternalServerError)
        .json({ message: 'Something went wrong...' });
};

const onNoMatch: NoMatchHandler<NextApiRequest, NextApiResponse<ProblemDetails>> = (
    _,
    response
) => {
    response.status(HttpStatus.Code404NotFound).json({
        message: 'The requested page does not exist.'
    });
};

const createController = <
    TRequest extends NextApiRequest = NextApiRequest,
    TResponse extends NextApiResponse = NextApiResponse
>(
    configure: (server: Server<TRequest, TResponse>) => void
) => {
    const connector = connect<TRequest, TResponse>({ onError, onNoMatch });

    configure(connector);

    return connector as (request: TRequest, response: TResponse) => Promise<void>;
};

export default createController;
