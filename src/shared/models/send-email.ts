import { GetCsrfTokenResponse } from './csrf-token';

export type PostSendEmailBody = {
    name?: string;
    email: string;
    subject: string;
    message: string;
} & GetCsrfTokenResponse;
