import { TodoEntity } from "../entities/todo.entity";
import { ITodo } from "../interfaces/todo.interface";


export class Todo {
    
    private _id: number;
    private _text: string;
    private _isCompleted: boolean;
    private _createdAt: Date;
    private _updatedAt: Date;
    private _completedAt: Date | null;
  
    constructor({ 
        id, text, isCompleted, 
        createdAt, updatedAt, completedAt 
    }: ITodo) {

        this._id = id;
        this._text = text;
        this._isCompleted = isCompleted ?? false;
        this._createdAt = createdAt ?? new Date();
        this._updatedAt = updatedAt ?? new Date();
        this._completedAt = completedAt ?? null;
    }

    get id(): number { 
        return this._id; 
    }
    get text(): string { 
        return this._text; 
    }
    get isCompleted(): boolean { 
        return this._isCompleted; 
    }
    get createdAt(): Date { 
        return this._createdAt; 
    }
    get updatedAt(): Date { 
        return this._updatedAt; 
    }
    get completedAt(): Date | null { 
        return this._completedAt; 
    }

    set text(text: string) {
        this._text = text;
        this._updatedAt = new Date();
    }
    
    set isCompleted(isCompleted: boolean) {
        this._isCompleted = isCompleted;
        this._completedAt = isCompleted ? new Date() : null;
    }

    static fromEntity(entity: TodoEntity): Todo {
        return new this(entity);
    } 

    public toEntity(): TodoEntity {
        const entity: TodoEntity = {
            id: this._id,
            text: this._text,
            isCompleted: this._isCompleted,
            createdAt: this._createdAt,
            updatedAt: this._updatedAt,
            completedAt: this._completedAt
        }
        return entity;
    }
}