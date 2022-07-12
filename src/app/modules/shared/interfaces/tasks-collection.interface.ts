import { Task } from "../models/task.model";

export interface ITasksCollection {
    tasks: Task[];
    nextId: number;
    date: string;
}