import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderBy } from 'src/app/common/enums/order-by.enum';
import { LocalStorageService } from 'src/app/common/services/local-storage.service';
import { TodoEntity } from '../entities/todo.entity';
import { Todo } from '../models/todo.model';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private storageKey: string = 'todo';
  private nextIdStorageKey: string = 'nextId';

  private _nextId: number = 0;
  private _todosSubject$: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);

  constructor(private readonly storageService: LocalStorageService) {
    this._nextId = this.getNextId();
    this._todosSubject$.next(this.getTodos());
  }

  private getNextId(): number {
    if (this._nextId > 0) {
      return this._nextId;
    }
    const nextId = this.storageService.get(this.nextIdStorageKey);
    return nextId || this._nextId;
  }

  public get todos$(): Observable<Todo[]> {
    return this._todosSubject$.asObservable();
  }

  public getTodos(): Todo[] {

    if (this._todosSubject$.value.length > 0) {
      return this._todosSubject$.value;
    }
    this._todosSubject$.next(this.getTodosFromStorage());
  
    return this._todosSubject$.value;
  }

  public getTodoById(id: number): Todo | null {
    const todos: Todo[] = this.getTodos();
    let todo: Todo | null = null;

    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === id) {
        todo = todos[i];
      }
    }

    return todo;
  }

  public getTodosFromStorage(): Todo[] {
    const todosEntities: TodoEntity[] | null = this.storageService.get(this.storageKey);
    if (!todosEntities) {
      return []
    };
    const todos: Todo[] = todosEntities.map((t: TodoEntity) => Todo.fromEntity(t));
    return todos;
  }

  private setTodosToStorage(todos: Todo[]): Todo[] {
    const todosEntities: TodoEntity[] = todos.map((t: Todo) => t.toEntity());
    this.storageService.set(this.storageKey, todosEntities);
    return todos;
  }

  public addTodo(text: string): Todo {
    const todos: Todo[] = this.getTodos();
    const todo = new Todo({ id: this._nextId, text });

    todos.push(todo);

    this._todosSubject$.next(todos);
    this.setTodosToStorage(todos);

    this._nextId++;
    this.storageService.set(this.nextIdStorageKey, this._nextId);

    return todo;
  }

  public updateTodo(todo: Todo): Todo | null {

    const foundTodo: Todo | null = this.getTodoById(todo.id);

    if (!foundTodo) {
      return null;
    }

    const todos: Todo[] = this.getTodos();

    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === foundTodo.id) {
        todos[i] = todo;
      }
    }

    this._todosSubject$.next(todos);
    this.setTodosToStorage(todos);
    this._nextId++;

    return todo;
  }

  public removeTodoById(id: number): Todo[] {
    const todos: Todo[] = this.getTodos();
    const filteredTodos: Todo[] = todos.filter((todo)=> todo.id !== id);

    this._todosSubject$.next(filteredTodos);
    this.setTodosToStorage(filteredTodos);

    return filteredTodos;
  }

  public getSortedTodosByCreatedDate(sort: OrderBy = OrderBy.ASC): Todo[] {
    const todos: Todo[] = this.getTodos();
    
    const sortedTodos: Todo[] = sort === OrderBy.DESC 
      ? [...todos].sort((a: Todo, b: Todo) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      : [...todos].sort((a: Todo, b: Todo) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    
    this._todosSubject$.next(sortedTodos);

    return sortedTodos;
  }

  public getSortedTodosByCompleted(sort: OrderBy = OrderBy.ASC): Todo[] {
    const todos: Todo[] = this.getTodos();

    const completed: Todo[] = todos.filter((t: Todo) => t.isCompleted)
    const incompleted: Todo[] = todos.filter((t: Todo) => !t.isCompleted)
    
    const sortedTodos: Todo[] = sort === OrderBy.DESC 
      ? [...incompleted, ...completed] 
      : [...completed, ...incompleted];

    this._todosSubject$.next(sortedTodos);
    return sortedTodos;
  }

  public setSortedTodosToDefault(): Todo[] {
    const todos: Todo[] = this.getTodosFromStorage();
    this._todosSubject$.next(todos);
    return todos;
  }
}
