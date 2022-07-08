import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderBy } from 'src/app/common/enums/order-by.enum';
import { Todo } from 'src/app/todo/models/todo.model';
import { TodoService } from 'src/app/todo/services/todo.service';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers : [TodoService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent implements OnInit {

  public todos$!: Observable<Todo[]>;

  constructor(private readonly todoService: TodoService) { }

  public ngOnInit(): void {
    this.getTodos();
  }

  private getTodos() {
    this.todos$ = this.todoService.getTodos$();
  }

  public addTodo(text: string) {
    this.todoService.addTodo(text);
  }

  public changeStatus(todo: Todo) {
    console.log(todo)
    todo.isCompleted ? todo.uncomplete() : todo.complete();
    console.log(todo)
    this.todoService.updateTodo(todo);
  }

  public removeTodo(todo: Todo) {
    this.todoService.removeTodoById(todo.id);
  }

  public sortByCreatedDateAsc() {
    this.todoService.getSortedTodosByCreatedDate(OrderBy.ASC);
  }

  public sortByCreatedDateDesc() {
    this.todoService.getSortedTodosByCreatedDate(OrderBy.DESC);
  }

  public sortByComletedAsc() {
    this.todoService.getSortedTodosByCompleted(OrderBy.ASC);
  }

  public sortByComletedDesc() {
    this.todoService.getSortedTodosByCompleted(OrderBy.DESC);
  }
}
