import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { OrderBy } from 'src/app/common/enums/order-by.enum';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';


@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoFormComponent implements OnInit {

  // public todos$!: Observable<Todo[]>;
  public error: boolean = false;
  public addForm!: FormGroup;

  constructor(private readonly todoService: TodoService) { }

  public ngOnInit(): void {
    this.addForm = new FormGroup({
      text: new FormControl('', Validators.required)
    });
    // this.getTodos();
  }

  // private getTodos(): void {
  //   this.todos$ = this.todoService.todos$;
  //   this.todoService.getTodos();
  // }

  public addTodo(): void {
    if (!this.addForm.valid) {
      console.log(this.addForm.controls['text']);
      this.error = true;
      return;
    }
    const { text } = this.addForm.value;
    this.todoService.addTodo(text);
    this.addForm.reset();
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
