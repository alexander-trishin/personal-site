export const enum CookieName {
    CsrfToken = '__Host-AT.csrf-token',
    Session = '__Host-AT.session'
}

export const enum ContentEncoding {
    Brotli = 'br',
    GZip = 'gzip'
}

export const enum HeaderName {
    AcceptEncoding = 'Accept-Encoding',
    Allow = 'Allow',
    ContentEncoding = 'Content-Encoding',
    ContentType = 'Content-Type',
    CsrfToken = 'AT-CSRF-Token',
    SetCookie = 'Set-Cookie'
}

export const enum HttpMethod {
    Get = 'GET',
    Head = 'HEAD',
    Post = 'POST',
    Put = 'PUT',
    Patch = 'PATCH',
    Delete = 'DELETE'
}

export const enum HttpStatus {
    Code200OK = 200,
    Code201Created = 201,
    Code204NoContent = 204,
    Code400BadRequest = 400,
    Code401Unauthorized = 401,
    Code403Forbidden = 403,
    Code404NotFound = 404,
    Code405MethodNotAllowed = 405,
    Code406NotAcceptable = 406,
    Code409Conflict = 409,
    Code418ImATeapot = 418,
    Code422UnprocessableEntity = 422,
    Code429TooManyRequests = 429,
    Code500InternalServerError = 500,
    Code501NotImplemented = 501
}

export const enum MimeType {
    TextPlain = 'text/plain',
    TextXml = 'text/xml'
}
