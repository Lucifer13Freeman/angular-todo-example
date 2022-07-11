import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderBy } from 'src/app/common/enums/order-by.enum';
import { LocalStorageService } from 'src/app/common/services/local-storage.service';
import { ITodo } from '../interfaces/todo.interface';
import { Todo } from '../models/todo.model';


@Injectable()
export class TodoService {

  private KEY: string = 'todo';
  private NEXT_ID_KEY: string = 'nextId';
  private _todosSubject$: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);

  constructor(private readonly storageService: LocalStorageService) {}

  public get todos$(): Observable<Todo[]> {
    return this._todosSubject$.asObservable();
  }

  public getTodos(): Todo[] {
    this._todosSubject$.next(this.getTodosFromStorage());
    return this._todosSubject$.value;
  }

  public getTodoById(id: number): Todo | undefined {
    return this.getTodos().find((t: Todo) => t.id === id);
  }

  public getTodosFromStorage(): Todo[] {
    const todos: ITodo[] | null = this.storageService.get(this.KEY);
    return todos ? todos.map((t: ITodo) => new Todo(t)) : [];
  }

  private setTodosToStorage(todos: Todo[]): Todo[] {
    const todosEntities: ITodo[] = todos.map((t: Todo) => t.toEntity());
    this.storageService.set(this.KEY, todosEntities);
    return todos;
  }

  public addTodo(text: string): Todo {
    const todos: Todo[] = this.getTodos();
    let nextId = this.storageService.get(this.NEXT_ID_KEY);

    const todo = new Todo({ id: nextId, text });
    todos.push(todo);

    this._todosSubject$.next(todos);
    this.setTodosToStorage(todos);

    nextId++;
    this.storageService.set(this.NEXT_ID_KEY, nextId);

    return todo;
  }

  public updateTodo(todo: Todo): Todo | null {

    const todos: Todo[] = this.getTodos();
    const idx: number = todos.findIndex((t: Todo) => t.id === todo.id);

    if (idx === -1) {
      return null;
    }
    
    todos[idx] = todo;
    this._todosSubject$.next(todos);
    this.setTodosToStorage(todos);

    return todo;
  }

  public removeTodoById(id: number): Todo[] {
    const todos: Todo[] = this.getTodos().filter((todo)=> todo.id !== id);
    this._todosSubject$.next(todos);
    this.setTodosToStorage(todos);
    return todos;
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
