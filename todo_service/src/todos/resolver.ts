import { logger } from '#configs/logger.js';
import { ResolverContext } from '#types/index.js';
import { GraphQLError } from 'graphql';
import { CreateTodo, CreateTodoSchema } from './schema/create.js';
import { UpdateTodo, UpdateTodoSchema } from './schema/update.js';
import { IdSchema } from './schema/id.js';
import { zodErrorFormatter } from '#utils/format-error.js';
import { TodoDto } from './dto.js';

export const resolvers = {
    Query: {
        todos: async (
            _parent: any,
            __args: any,
            { todoRepository }: ResolverContext,
        ) => {
            const completedTodos = await todoRepository.findAllComplete();
            const notCompletedTodos = await todoRepository.findAllNotComplete();
            const todos = [...notCompletedTodos, ...completedTodos];
            const returnTodo = todos.map((todo) => new TodoDto(todo));
            return returnTodo;
        },
        todo: async (
            _parent: any,
            args: { id: string },
            { todoRepository }: ResolverContext,
        ) => {
            const validation = IdSchema.safeParse(args.id);
            if (validation.success === false) {
                const errors = zodErrorFormatter(validation.error);
                logger.error(`Todo Resolver: ${errors}`);
                throw new GraphQLError(errors);
            }
            const existTodo = await todoRepository.findById(validation.data);
            if (!existTodo) {
                logger.error(
                    `Todo Resolver: Todo not found with id ${args.id}`,
                );
                throw new GraphQLError('Todo not found');
            }
            const returnTodo = TodoDto.fromTodo(existTodo);
            return returnTodo;
        },
    },
    Mutation: {
        createTodo: async (
            _parent: any,
            args: { createInput: CreateTodo },
            { todoRepository }: ResolverContext,
        ) => {
            const validation = CreateTodoSchema.safeParse(args.createInput);
            if (validation.success === false) {
                const errors = zodErrorFormatter(validation.error);
                logger.error(`Create Todo Resolver: ${errors}`);
                throw new GraphQLError(errors);
            }
            const todo = await todoRepository.create(validation.data);
            const returnTodo = TodoDto.fromTodo(todo);
            return returnTodo;
        },

        updateTodo: async (
            _parent: any,
            args: { id: string; updateInput: UpdateTodo },
            { todoRepository }: ResolverContext,
        ) => {
            const validation = IdSchema.safeParse(args.id);
            if (validation.success === false) {
                const errors = zodErrorFormatter(validation.error);
                logger.error(`Update Todo Resolver: ${errors}`);
                throw new GraphQLError(errors);
            }
            const validationData = UpdateTodoSchema.safeParse(args.updateInput);
            if (validationData.success === false) {
                const errors = zodErrorFormatter(validationData.error);
                logger.error(`Update Todo Resolver: ${errors}`);
                throw new GraphQLError(errors);
            }
            const updatedTodo = await todoRepository.update(
                validation.data,
                validationData.data,
            );
            if (!updatedTodo) {
                logger.error(
                    `Update Todo Resolver: Todo not found with id ${args.id}`,
                );
                throw new GraphQLError('Todo not found');
            }
            const returnTodo = TodoDto.fromTodo(updatedTodo);
            return returnTodo;
        },

        deleteTodo: async (
            _parent: any,
            args: { id: string },
            { todoRepository }: ResolverContext,
        ) => {
            const validation = IdSchema.safeParse(args.id);
            if (validation.success === false) {
                const errors = zodErrorFormatter(validation.error);
                logger.error(`Delete Todo Resolver: ${errors}`);
                throw new GraphQLError(errors);
            }
            const result = await todoRepository.delete(validation.data);
            if (result === null) {
                logger.error(
                    `Delete Todo Resolver: Todo not found with id ${args.id}`,
                );
                throw new GraphQLError('Todo not found');
            }
            return result;
        },
    },
};
