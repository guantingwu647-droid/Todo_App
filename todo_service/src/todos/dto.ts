import { Todo } from '#types/index.js';

export class TodoDto {
    public id: string;
    public title: string;
    public description: string;
    public completed: boolean;
    public createdAt: Date;

    constructor({ id, title, description, completed, createdAt }: Todo) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.createdAt = createdAt;
    }

    static fromTodo(todo: Todo): TodoDto {
        return new TodoDto(todo);
    }
}
