import type { NextApiRequest, NextApiResponse } from 'next';

type NextHandler = (error?: unknown) => void;

export type HttpAction<
    TResponseBody extends unknown = void,
    TRequestExtensions = {},
    TResponseExtensions = {}
> = (
    request: NextApiRequest & TRequestExtensions,
    response: NextApiResponse<TResponseBody> & TResponseExtensions
) => void | Promise<void>;

export type HttpMiddleware<
    TResponseBody extends unknown = void,
    TRequestExtensions = {},
    TResponseExtensions = {}
> = (
    request: NextApiRequest & TRequestExtensions,
    response: NextApiResponse<TResponseBody> & TResponseExtensions,
    next: NextHandler
) => void | Promise<void>;

type HttpActionRegistrar<
    TRequest extends NextApiRequest,
    TResponse extends NextApiResponse = NextApiResponse
> = <TRequestExtensions = {}, TResponseExtensions = {}>(
    ...actions: HttpAction<
        TResponse extends NextApiResponse<infer TResponseBody> ? TResponseBody : never,
        TRequestExtensions,
        TResponseExtensions
    >[]
) => Server<TRequest, TResponse>;

export interface Server<TRequest extends NextApiRequest, TResponse extends NextApiResponse> {
    use: <TRequestExtensions = {}, TResponseExtensions = {}>(
        ...middleware: HttpMiddleware<
            TResponse extends NextApiResponse<infer TResponseBody> ? TResponseBody : never,
            TRequestExtensions,
            TResponseExtensions
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
