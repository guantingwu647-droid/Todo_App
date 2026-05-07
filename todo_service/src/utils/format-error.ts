import { ZodError } from 'zod';

export const zodErrorFormatter = (errors: ZodError) => {
    return errors.issues.map((issue) => issue.message).join(', ');
};
