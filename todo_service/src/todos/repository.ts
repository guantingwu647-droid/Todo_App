import { logger } from '#configs/logger.js';
import { Todo } from '#types/index.js';
import { CreateTodo } from './schema/create.js';
import { UpdateTodo } from './schema/update.js';

export class TodoRepository {
    protected readonly logger = logger;
    constructor(protected readonly db: any) {}

    async create(data: CreateTodo): Promise<Todo> {
        return this.db.create(data);
    }

    async update(id: string, data: UpdateTodo): Promise<Todo | null> {
        return this.db.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id: string): Promise<void> {
        await this.db.findByIdAndDelete(id);
    }

    async findById(id: string): Promise<Todo | null> {
        return this.db.findById(id).lean().exec();
    }

    async findAll(): Promise<Todo[]> {
        return this.db.find().lean().exec();
    }
}
