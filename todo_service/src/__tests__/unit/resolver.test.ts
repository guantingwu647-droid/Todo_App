import { TodoRepository } from '#todos/repository.js';
import { resolvers } from '#todos/resolver.js';
import { describe, expect, it, Mocked, vitest } from 'vitest';
import { returnTodo } from '../utils/todo.js';
import { TodoDto } from '#todos/dto.js';

describe('resolver', () => {
    const mockTodoRepository = {
        findAll: vitest.fn(),
        create: vitest.fn(),
        update: vitest.fn(),
        delete: vitest.fn(),
        findById: vitest.fn(),
    } as unknown as Mocked<TodoRepository>;

    describe('query', () => {
        describe('todos', () => {
            it('When there have todos, should return todos with dto format', async () => {
                const todos = [returnTodo({}), returnTodo({}), returnTodo({})];
                const validReturnTodos = todos.map((todo) => new TodoDto(todo));
                mockTodoRepository.findAll.mockResolvedValue(todos);

                const result = await resolvers.Query.todos(null, null, {
                    todoRepository: mockTodoRepository,
                });

                expect(result).toEqual(validReturnTodos);
            });
        });

        describe('todo', () => {
            it('should return todo', async () => {
                const todo = returnTodo({});
                const validReturnTodo = TodoDto.fromTodo(todo);
                mockTodoRepository.findById.mockResolvedValue(todo);
                const result = await resolvers.Query.todo(
                    null,
                    { id: todo.id },
                    {
                        todoRepository: mockTodoRepository,
                    },
                );

                expect(result).toEqual(validReturnTodo);
            });

            it('When id is not valid uuid, should throw error', async () => {
                mockTodoRepository.findById.mockResolvedValue(null);

                await expect(
                    resolvers.Query.todo(
                        null,
                        { id: 'not-valid' },
                        {
                            todoRepository: mockTodoRepository,
                        },
                    ),
                ).rejects.toThrow(/Id must be a valid UUID/);
            });

            it('When todo is not found, should throw error', async () => {
                const todo = returnTodo({});

                mockTodoRepository.findById.mockResolvedValue(null);
                await expect(
                    resolvers.Query.todo(
                        null,
                        { id: todo.id },
                        {
                            todoRepository: mockTodoRepository,
                        },
                    ),
                ).rejects.toThrow(/Todo not found/);
            });
        });
    });

    describe('mutation', () => {
        describe('createTodo', () => {
            it('When create info is valid, should create todo and return it with dto format', async () => {
                const todo = returnTodo({});
                const validReturnTodo = TodoDto.fromTodo(todo);
                mockTodoRepository.create.mockResolvedValue(todo);

                const result = await resolvers.Mutation.createTodo(
                    null,
                    { title: todo.title, description: todo.description },
                    {
                        todoRepository: mockTodoRepository,
                    },
                );

                expect(result).toEqual(validReturnTodo);
            });

            it('When title is empty, should throw error', async () => {
                await expect(
                    resolvers.Mutation.createTodo(
                        null,
                        { title: '', description: 'description 1' },
                        {
                            todoRepository: mockTodoRepository,
                        },
                    ),
                ).rejects.toThrow(/Title at least 1 character/);
            });

            it('When title is over 255 characters, should throw error', async () => {
                await expect(
                    resolvers.Mutation.createTodo(
                        null,
                        {
                            title: 'a'.repeat(256),
                            description: 'description 1',
                        },
                        {
                            todoRepository: mockTodoRepository,
                        },
                    ),
                ).rejects.toThrow(/Title at most 255 character/);
            });

            it('When description is empty, should throw error', async () => {
                await expect(
                    resolvers.Mutation.createTodo(
                        null,
                        { title: 'title 1', description: '' },
                        {
                            todoRepository: mockTodoRepository,
                        },
                    ),
                ).rejects.toThrow(/Description at least 1 character/);
            });

            it('When description is over 1000 characters, should throw error', async () => {
                await expect(
                    resolvers.Mutation.createTodo(
                        null,
                        { title: 'title 1', description: 'a'.repeat(1001) },
                        {
                            todoRepository: mockTodoRepository,
                        },
                    ),
                ).rejects.toThrow(/Description at most 1000 character/);
            });
        });

        describe('updateTodo', () => {
            it('When update info is valid, should update todo and return it with dto format', async () => {
                const todo = returnTodo({});
                const validReturnTodo = TodoDto.fromTodo(todo);
                mockTodoRepository.update.mockResolvedValue(todo);

                const result = await resolvers.Mutation.updateTodo(
                    null,
                    { id: todo.id, data: { title: todo.title } },
                    {
                        todoRepository: mockTodoRepository,
                    },
                );

                expect(result).toEqual(validReturnTodo);
            });

            it('When id is not valid uuid, should throw error', async () => {
                await expect(
                    resolvers.Mutation.updateTodo(
                        null,
                        { id: 'not-valid', data: { title: 'title 1' } },
                        {
                            todoRepository: mockTodoRepository,
                        },
                    ),
                ).rejects.toThrow(/Id must be a valid UUID/);
            });

            it('When title is empty, should throw error', async () => {
                const todo = returnTodo({});

                await expect(
                    resolvers.Mutation.updateTodo(
                        null,
                        { id: todo.id, data: { title: '' } },
                        {
                            todoRepository: mockTodoRepository,
                        },
                    ),
                ).rejects.toThrow(/Title at least 1 character/);
            });

            it('When title is over 255 characters, should throw error', async () => {
                const todo = returnTodo({});

                await expect(
                    resolvers.Mutation.updateTodo(
                        null,
                        {
                            id: todo.id,
                            data: { title: 'a'.repeat(256) },
                        },
                        {
                            todoRepository: mockTodoRepository,
                        },
                    ),
                ).rejects.toThrow(/Title at most 255 character/);
            });

            it('When description is empty, should throw error', async () => {
                const todo = returnTodo({});

                await expect(
                    resolvers.Mutation.updateTodo(
                        null,
                        { id: todo.id, data: { description: '' } },
                        {
                            todoRepository: mockTodoRepository,
                        },
                    ),
                ).rejects.toThrow(/Description at least 1 character/);
            });

            it('When description is over 1000 characters, should throw error', async () => {
                const todo = returnTodo({});

                await expect(
                    resolvers.Mutation.updateTodo(
                        null,
                        {
                            id: todo.id,
                            data: { description: 'a'.repeat(1001) },
                        },
                        {
                            todoRepository: mockTodoRepository,
                        },
                    ),
                ).rejects.toThrow(/Description at most 1000 character/);
            });

            it('When completed is not boolean, should throw error', async () => {
                const todo = returnTodo({});

                await expect(
                    resolvers.Mutation.updateTodo(
                        null,
                        { id: todo.id, data: { completed: 'true' as any } },
                        {
                            todoRepository: mockTodoRepository,
                        },
                    ),
                ).rejects.toThrow(/Invalid input/);
            });
        });
    });
});
