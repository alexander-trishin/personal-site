import type { NextApiRequest, NextApiResponse } from 'next';

type NextHandler = (error?: unknown) => void;

export type HttpAction<
    TRequest extends NextApiRequest = NextApiRequest,
    TResponse extends NextApiResponse = NextApiResponse
> = (request: TRequest, response: TResponse) => void | Promise<void>;

export type HttpMiddleware<
    TRequest extends NextApiRequest = NextApiRequest,
    TResponse extends NextApiResponse = NextApiResponse
> = (request: TRequest, response: TResponse, next: NextHandler) => void | Promise<void>;

type HttpActionRegistrar<TRequest extends NextApiRequest, TResponse extends NextApiResponse> = <
    TRequestExtensions = {},
    TResponseExtensions = {}
>(
    ...actions: HttpAction<TRequest & TRequestExtensions, TResponse & TResponseExtensions>[]
) => Server<TRequest, TResponse>;

export interface Server<TRequest extends NextApiRequest, TResponse extends NextApiResponse> {
    use: <TRequestExtensions = {}, TResponseExtensions = {}>(
        ...middleware: HttpMiddleware<
            TRequest & TRequestExtensions,
            TResponse & TResponseExtensions
        >[]
    ) => this;

    get: HttpActionRegistrar<TRequest, TResponse>;
    head: HttpActionRegistrar<TRequest, TResponse>;
    options: HttpActionRegistrar<TRequest, TResponse>;
    post: HttpActionRegistrar<TRequest, TResponse>;
    put: HttpActionRegistrar<TRequest, TResponse>;
    patch: HttpActionRegistrar<TRequest, TResponse>;
    delete: HttpActionRegistrar<TRequest, TResponse>;
}
