import { Injectable } from "@angular/core";
import { BehaviorSubject, delay, Observable } from "rxjs";
import * as moment from "moment";
import { ITask } from "../interfaces/task.interface";
import { LocalStorageService } from "src/app/common/services/local-storage.service";
import { ITasksCollection } from "../interfaces/tasks-collection.interface";


@Injectable()
export class TasksService {

    private KEY: string = 'task';
    private NEXT_ID_KEY: string = 'taskNextId';

    private _tasksSubject$: BehaviorSubject<ITask[]> = new BehaviorSubject<ITask[]>([]);

    constructor(private readonly storageService: LocalStorageService) {}

    get tasks$(): Observable<ITask[]> {
        return this._tasksSubject$.asObservable();
    }

    public getTasks$(date: moment.Moment): Observable<ITask[]> {
        const tasksCollection: ITasksCollection = this.getTasksFromStorage(date.format('DD-MM-YYYY'));
        this._tasksSubject$.next(tasksCollection.tasks);
        return this._tasksSubject$;
    }

    public getTasks(date: moment.Moment): ITask[] {
        const tasksCollection: ITasksCollection = this.getTasksFromStorage(date.format('DD-MM-YYYY'));
        this._tasksSubject$.next(tasksCollection.tasks);
        return this._tasksSubject$.value;
    }

    private getNextId(date: string): number {
        return this.storageService.get(`${this.NEXT_ID_KEY}_${date}`);
    }

    public getTasksFromStorage(date: string): ITasksCollection {
        const key = `${this.KEY}_${date}`;
        const tasks: ITask[] = this.storageService.get(key) ?? [];
        const nextId: number = this.getNextId(date) ?? 1;

        return {
            tasks, nextId, date
        }
    }

    private setTasksToStorage(tasks: ITasksCollection): ITasksCollection {
        const key = `${this.KEY}_${tasks.date}`;
        this.storageService.set(key, tasks.tasks);
        return tasks;
    }

    public addTask(task: ITask): ITask {

        const tasksCollection: ITasksCollection = this.getTasksFromStorage(task.date);
        tasksCollection.tasks.push({ id: tasksCollection.nextId, ...task});
        this._tasksSubject$.next(tasksCollection.tasks);

        this.setTasksToStorage(tasksCollection);
    
        tasksCollection.nextId++;
        this.storageService.set(`${this.NEXT_ID_KEY}_${tasksCollection.date}`, tasksCollection.nextId);
    
        return task;
    }

    public removeTask(task: ITask): ITask[] {
        let tasksCollection: ITasksCollection = this.getTasksFromStorage(task.date);
        tasksCollection.tasks = tasksCollection.tasks.filter((t: ITask) => t.id !== task.id);
        
        this._tasksSubject$.next(tasksCollection.tasks);
        this.setTasksToStorage(tasksCollection);

        return tasksCollection.tasks;
    }
}