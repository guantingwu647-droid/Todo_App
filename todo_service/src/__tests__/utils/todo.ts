import { CreateTodo } from '#todos/schema/create.js';
import { Todo } from '#types/index.js';
import { faker } from '@faker-js/faker';

export const createInfo = (todo: Partial<CreateTodo>) => {
    return {
        title: todo.title,
        description: todo.description,
        ...todo,
    };
};
export const returnTodo = (todo: Partial<Todo>) => {
    return {
        id: faker.string.uuid(),
        title: faker.word.verb() + ' ' + faker.word.noun(),
        description: faker.lorem.sentence(),
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        ...todo,
    };
};
