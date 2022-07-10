import { ITask } from "./task.interface";

export interface ITasksCollection {
    tasks: ITask[];
    nextId: number;
    date: string;
}