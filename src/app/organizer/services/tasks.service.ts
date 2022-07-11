import { Injectable } from "@angular/core";
import { BehaviorSubject, delay, Observable } from "rxjs";
import * as moment from "moment";
import { ITask } from "../interfaces/task.interface";
import { LocalStorageService } from "src/app/common/services/local-storage.service";
import { ITasksCollection } from "../interfaces/tasks-collection.interface";


@Injectable()
export class TasksService {

    private storageKey: string = 'task';
    private nextIdStorageKey: string = 'taskNextId';

    private _tasksSubject$: BehaviorSubject<ITask[]> = new BehaviorSubject<ITask[]>([]);

    constructor(private readonly storageService: LocalStorageService) {
        // this.getTasks(moment());
    }

    get tasks$(): Observable<ITask[]> {
        return this._tasksSubject$.asObservable();
    }

    public getTasks$(date: moment.Moment): Observable<ITask[]> {
        const tasksCollection: ITasksCollection = this.getTasksFromStorage(date);
        this._tasksSubject$.next(tasksCollection.tasks);
        return this._tasksSubject$;
    }

    public getTasks(date: moment.Moment): ITask[] {
        const tasksCollection: ITasksCollection = this.getTasksFromStorage(date);
        this._tasksSubject$.next(tasksCollection.tasks);
        return this._tasksSubject$.value;
    }

    // public async getTasksAsync(date: moment.Moment): Promise<ITask[]> {
    //     const tasks: ITask[] = (await this.getTasksFromStorageAsync(date)).tasks;
    //     this._tasksSubject$.next(tasks);
    //     return this._tasksSubject$.value;
    // }

    private getNextId(date: moment.Moment): number {
        const nextId = this.storageService.get(`${this.nextIdStorageKey}_${date.format('DD-MM-YYYY')}`);
        return nextId;
    }

    // public async getTasksFromStorageAsync(date: moment.Moment): Promise<ITasksCollection> {

    //     // const tasks: ITask[] = this.storageService.get(`${this.storageKey}_${date.format('DD-MM-YYYY')}`) ?? [];
    //     // console.log(this.storageService.get('task_11-07-2022'))

    //     const tasks: ITask[] = await this.storageService.getAsync(`${this.storageKey}_${date.format('DD-MM-YYYY')}`);

    //     const nextId: number = this.getNextId(date) ?? 1;

    //     const tasksFromStorage: ITasksCollection = {
    //         tasks, nextId, date: date.format('DD-MM-YYYY')
    //     }
    //     console.log(tasksFromStorage, `${this.storageKey}_${date.format('DD-MM-YYYY')}`)
    //     return tasksFromStorage;
    // }

    public getTasksFromStorage(date: moment.Moment): ITasksCollection {

        const key = `${this.storageKey}_${date.format('DD-MM-YYYY')}`;
        const tasks: ITask[] = this.storageService.get(key) ?? [];
        const nextId: number = this.getNextId(date) ?? 1;

        const tasksFromStorage: ITasksCollection = {
            tasks, nextId, date: date.format('DD-MM-YYYY')
        }
        console.log(tasksFromStorage, key)
        return tasksFromStorage;
    }

    private setTasksToStorage(tasks: ITasksCollection): ITasksCollection {
        this.storageService.set(`${this.storageKey}_${tasks.date}`, tasks.tasks);
        return tasks;
    }

    public addTask(task: ITask): ITask {

        const tasksCollection: ITasksCollection = this.getTasksFromStorage(moment(task.date));

        tasksCollection.tasks.push({ id: tasksCollection.nextId, ...task});
        this._tasksSubject$.next(tasksCollection.tasks);

        this.setTasksToStorage(tasksCollection);
    
        tasksCollection.nextId++;
        this.storageService.set(`${this.nextIdStorageKey}_${tasksCollection.date}`, tasksCollection.nextId);
    
        return task;
    }

    public removeTask(task: ITask): ITask[] {
        let tasksCollection: ITasksCollection = this.getTasksFromStorage(moment(task.date));
        tasksCollection.tasks = tasksCollection.tasks.filter((t: ITask) => t.id !== task.id);
        
        this._tasksSubject$.next(tasksCollection.tasks);
        this.setTasksToStorage(tasksCollection);

        return tasksCollection.tasks;
    }
}