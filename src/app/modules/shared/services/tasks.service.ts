import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ITask } from "../interfaces/task.interface";
import { LocalStorageService } from "src/app/modules/shared/services/local-storage.service";
import { ITasksCollection } from "../interfaces/tasks-collection.interface";
import { Task } from "../models/task.model";
import { SortOrderBy } from "../enums/sort-order-by.enum";


@Injectable()
export class TasksService {

    private KEY: string = 'task';
    private NEXT_ID_KEY: string = 'taskNextId';

    private _tasksSubject$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

    constructor(private readonly storageService: LocalStorageService) {}

    get tasks$(): Observable<Task[]> {
        return this._tasksSubject$.asObservable();
    }

    public getTasks$(date: string): Observable<Task[]> {
        this.getTasks(date);
        return this.tasks$;
    }

    public getTasks(date: string): Task[] {
        const tasksCollection: ITasksCollection = this.getTasksFromStorage(date);
        this._tasksSubject$.next(tasksCollection.tasks);
        return this._tasksSubject$.value;
    }

    private getNextId(date: string): number {
        return this.storageService.get(`${this.NEXT_ID_KEY}_${date}`);
    }

    public getTasksFromStorage(date: string): ITasksCollection {
        const key = `${this.KEY}_${date}`;
        const tasks: Task[] = this.storageService.get(key)?.map((t: ITask) => new Task(t)) ?? [];
        const nextId: number = this.getNextId(date) ?? 1;

        return {
            tasks, nextId, date
        }
    }

    private setTasksToStorage(tasks: ITasksCollection): ITasksCollection {
        const key = `${this.KEY}_${tasks.date}`;
        const tasksEntities: ITask[] = tasks.tasks.map((t: Task) => t.toEntity());
        this.storageService.set(key, tasksEntities);
        return tasks;
    }

    public addTask(text: string, date: string): Task {

        const tasksCollection: ITasksCollection = this.getTasksFromStorage(date);

        const task: Task = new Task({ id: tasksCollection.nextId, text, date }); 

        tasksCollection.tasks.push(task);
        this._tasksSubject$.next(tasksCollection.tasks);

        this.setTasksToStorage(tasksCollection);
    
        tasksCollection.nextId++;
        this.storageService.set(`${this.NEXT_ID_KEY}_${tasksCollection.date}`, tasksCollection.nextId);
    
        return task;
    }
    
    public updateTask(task: Task): Task | null {

        const tasks: ITasksCollection = this.getTasksFromStorage(task.date);
        const idx: number = tasks.tasks.findIndex((t: Task) => t.id === task.id);
    
        if (idx === -1) {
          return null;
        }
        
        tasks.tasks[idx] = task;
        this._tasksSubject$.next(tasks.tasks);
        this.setTasksToStorage(tasks);
    
        return task;
    }

    public removeTask(task: Task): Task[] {
        let tasksCollection: ITasksCollection = this.getTasksFromStorage(task.date);
        tasksCollection.tasks = tasksCollection.tasks.filter((t: Task) => t.id !== task.id);
        
        this._tasksSubject$.next(tasksCollection.tasks);
        this.setTasksToStorage(tasksCollection);

        return tasksCollection.tasks;
    }
    
    public getSortedTasksByCreatedDate(date: string, sort: SortOrderBy = SortOrderBy.ASC): Task[] {
        const tasks: Task[] = this.getTasksFromStorage(date).tasks;
        
        const sortedTasks: Task[] = sort === SortOrderBy.DESC 
          ? [...tasks].sort((a: Task, b: Task) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          : [...tasks].sort((a: Task, b: Task) => 
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        
        this._tasksSubject$.next(sortedTasks);
    
        return sortedTasks;
    }
    
    public getSortedTodosByCompleted(date: string, sort: SortOrderBy = SortOrderBy.ASC): Task[] {
        const tasks: Task[] = this.getTasksFromStorage(date).tasks;
    
        const completed: Task[] = tasks.filter((t: Task) => t.isCompleted)
        const incompleted: Task[] = tasks.filter((t: Task) => !t.isCompleted)
        
        const sortedTasks: Task[] = sort === SortOrderBy.DESC 
          ? [...incompleted, ...completed] 
          : [...completed, ...incompleted];
    
        this._tasksSubject$.next(sortedTasks);
        return sortedTasks;
    }
}