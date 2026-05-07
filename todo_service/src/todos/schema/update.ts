import z from 'zod';

export const UpdateTodoSchema = z.object({
    title: z
        .string()
        .min(1, 'Title at least 1 character')
        .max(255, 'Title at most 255 character')
        .optional(),
    description: z
        .string()
        .min(1, 'Description at least 1 character')
        .max(1000, 'Description at most 1000 character')
        .optional(),
    completed: z.boolean().optional(),
});

export type UpdateTodo = z.infer<typeof UpdateTodoSchema>;
