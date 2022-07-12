import * as moment from "moment";
import { ITask } from "../interfaces/task.interface";


export class Task {
    
    private _id: number;
    private _text: string;
    private _isCompleted: boolean;
    private _date: string;
    private _createdAt: Date;
    private _updatedAt: Date;
    private _completedAt: Date | null;
  
    constructor(task: ITask) {
        this._id = task.id;
        this._text = task.text;
        this._isCompleted = task.isCompleted ?? false;
        this._date = task.date ?? moment().format('DD-MM-YYYY');
        this._createdAt = task.createdAt ?? new Date();
        this._updatedAt = task.updatedAt ?? new Date();
        this._completedAt = task.completedAt ?? null;
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
    get date(): string { 
        return this._date; 
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
    set date(date: string) {
        this._date = date;
    }

    public toEntity(): ITask {
        return {
            id: this._id,
            text: this._text,
            date: this._date,
            isCompleted: this._isCompleted,
            createdAt: this._createdAt,
            updatedAt: this._updatedAt,
            completedAt: this._completedAt
        }
    }
}