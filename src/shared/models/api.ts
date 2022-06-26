import type { ZodIssue } from 'zod';

export interface ProblemDetails {
    message: string;
    errors?: ZodIssue[];
}
