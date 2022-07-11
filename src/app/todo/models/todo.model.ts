import { ITodo } from "../interfaces/todo.interface";


export class Todo {
    
    private _id: number;
    private _text: string;
    private _isCompleted: boolean;
    private _createdAt: Date;
    private _updatedAt: Date;
    private _completedAt: Date | null;
  
    constructor(todo: ITodo) {
        this._id = todo.id;
        this._text = todo.text;
        this._isCompleted = todo.isCompleted ?? false;
        this._createdAt = todo.createdAt ?? new Date();
        this._updatedAt = todo.updatedAt ?? new Date();
        this._completedAt = todo.completedAt ?? null;
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

    public toEntity(): ITodo {
        return {
            id: this._id,
            text: this._text,
            isCompleted: this._isCompleted,
            createdAt: this._createdAt,
            updatedAt: this._updatedAt,
            completedAt: this._completedAt
        }
    }
}