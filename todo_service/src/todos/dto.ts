import { Todo } from '#types/index.js';

export class TodoDto {
    public id: string;
    public title: string;
    public description: string;
    public completed: boolean;
    public createdAt: Date;

    constructor({
        id,
        title,
        description,
        completed,
        createdAt,
    }: Partial<Todo>) {
        this.id = id as string;
        this.title = title as string;
        this.description = description as string;
        this.completed = completed as boolean;
        this.createdAt = createdAt as Date;
    }

    static fromTodo(todo: Partial<Todo>): TodoDto {
        return new TodoDto(todo);
    }
}
