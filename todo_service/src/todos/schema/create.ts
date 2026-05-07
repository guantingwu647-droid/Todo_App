import z from 'zod';

export const CreateTodoSchema = z.object({
    title: z
        .string()
        .min(1, 'Title at least 1 character')
        .max(255, 'Title at most 255 character'),
    description: z
        .string()
        .min(1, 'Description at least 1 character')
        .max(1000, 'Description at most 1000 character'),
});

export type CreateTodo = z.infer<typeof CreateTodoSchema>;
