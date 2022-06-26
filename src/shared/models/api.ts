import { ZodIssue } from 'zod';

type ErrorDetail = Pick<ZodIssue, 'code' | 'path' | 'message'>;

export interface ProblemDetails {
    message: string;
    errors?: ErrorDetail[];
}
