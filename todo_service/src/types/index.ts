import { TodoRepository } from '#todos/repository.js';

export enum ERROR_CODE {
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    SERVER_ERROR = 500,
    SERVER_CONFLICT = 409,
    TOO_MANY_REQUEST = 429,
    SERVER_UNAVAILABLE = 503,
}

export type ResolverContext = {
    todoRepository: TodoRepository;
};

export type Todo = {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
};
