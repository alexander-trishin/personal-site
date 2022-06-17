import type { IncomingMessage, ServerResponse } from 'http';

import { CookieSerializeOptions, parse, serialize } from 'cookie';

import { HeaderName } from 'common/constants';
import { isClientSide } from 'utils/common/dom';

export interface ICookieSerializerOptions extends CookieSerializeOptions {
    req?: Pick<IncomingMessage, 'headers'> & {
        cookies?: Record<string, string>;
    };
    res?: Pick<ServerResponse, 'getHeader' | 'setHeader'>;
}

const CookieMaxLength = 4 * 1024;

const parseCookieValue = (value: unknown) => {
    if (typeof value !== 'string') return value;

    if (value === 'undefined') {
        return undefined;
    } else {
        const cookie = value.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);

        try {
            return JSON.parse(cookie);
        } catch (error) {
            return cookie;
        }
    }
};

const serializeCookieValue = (value: unknown) => {
    if (typeof value === 'undefined') return 'undefined';
    if (typeof value === 'string') return value;

    return JSON.stringify(value);
};

export const getCookies = (options?: ICookieSerializerOptions): Record<string, string> => {
    const { req: request } = options ?? {};

    if (!isClientSide()) {
        if (request?.cookies) return request.cookies;
        if (request?.headers?.cookie) return parse(request.headers.cookie);

        return {};
    }

    return (document.cookie?.split(';') ?? []).reduce((cookies, cookie) => {
        if (cookie !== '') {
            const [name, ...values] = cookie.trim().split('=');

            cookies[name] = values.join('=');
        }

        return cookies;
    }, {} as Record<string, string>);
};

export const getCookie = <T>(key: string, options?: ICookieSerializerOptions) => {
    const cookies = getCookies(options);

    return parseCookieValue(cookies[key]) as T;
};

export const setCookie = (key: string, value: unknown, options?: ICookieSerializerOptions) => {
    const { req: request, res: response, ...cookieSerializerOptions } = options ?? {};

    const cookieString = serialize(key, serializeCookieValue(value), {
        path: '/',
        ...cookieSerializerOptions
    });

    if (cookieString.length > CookieMaxLength) {
        throw new Error(
            `Cookie length is too big (${cookieString.length}/${CookieMaxLength}), browsers will refuse it. Try to remove some data.`
        );
    }

    if (isClientSide()) {
        document.cookie = cookieString;
        return;
    }

    if (!request || !response) {
        return;
    }

    const setCookieHeader = (response.getHeader(HeaderName.SetCookie) ?? []) as string | string[];

    response.setHeader(
        HeaderName.SetCookie,
        !setCookieHeader ? [cookieString] : setCookieHeader.concat(cookieString)
    );

    const setCookieValue = (cookies: Record<string, string>) => {
        if (value) {
            cookies[key] = serializeCookieValue(value);
        } else {
            delete cookies[key];
        }
    };

    if (request.cookies) setCookieValue(request.cookies);

    if (request.headers?.cookie) {
        const cookies = parse(request.headers.cookie);

        setCookieValue(cookies);

        request.headers.cookie = Object.entries(cookies).reduce(
            (cookie, [currentKey, currentValue]) => {
                return `${cookie}${currentKey}=${currentValue};`;
            },
            ''
        );
    }
};

export const hasCookie = (key: string, options?: ICookieSerializerOptions) => {
    if (!key) return false;

    return getCookies(options).hasOwnProperty(key);
};

export const deleteCookie = (key: string, options: ICookieSerializerOptions = {}) => {
    setCookie(key, '', { ...options, maxAge: -1 });
};
