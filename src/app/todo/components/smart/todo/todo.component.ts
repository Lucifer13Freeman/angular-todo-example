import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  public editingTodo: Todo | null = null;

  public todoAdd: FormControl = new FormControl('');
  public todoEdit: FormControl = new FormControl('');

  constructor(private readonly todoService: TodoService) { }

  public ngOnInit(): void {
    this.getTodos();
  }

  private getTodos(): void {
    this.todos$ = this.todoService.todos$;
  }

  public addTodo(text: string): void {
    if (text === '' || this.editingTodo) {
      return;
    }
    this.todoService.addTodo(text);
    this.todoAdd.setValue('');
  }

  public changeStatus(todo: Todo): void {
    todo.isCompleted = !todo.isCompleted;
    this.todoService.updateTodo(todo);
  }

  public editTodo(todo: Todo): void {
    this.editingTodo = todo;
    this.todoEdit.setValue(todo.text);
  }

  public onSubmitEditTodo(): void {
    if (!this.editingTodo) {
      return;
    }
    this.editingTodo.text = this.todoEdit.value;
    this.todoService.updateTodo(this.editingTodo);
    this.editingTodo = null;
    this.todoEdit.setValue('');
  }

  public onCancelEditTodo(): void {
    if (!this.editingTodo) {
      return;
    }
    this.editingTodo = null;
  }

  public removeTodo(todo: Todo): void {
    this.todoService.removeTodoById(todo.id);
  }

  public sortByCreatedDateAsc(): void {
    this.todoService.getSortedTodosByCreatedDate(OrderBy.ASC);
  }

  public sortByCreatedDateDesc(): void {
    this.todoService.getSortedTodosByCreatedDate(OrderBy.DESC);
  }

  public sortByComletedAsc(): void {
    this.todoService.getSortedTodosByCompleted(OrderBy.ASC);
  }

  public sortByComletedDesc(): void {
    this.todoService.getSortedTodosByCompleted(OrderBy.DESC);
  }
}
