import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderBy } from 'src/app/common/enums/order-by.enum';
import { TodoService } from '../../services/todo.service';


@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoFormComponent implements OnInit {

  public ASK: OrderBy = OrderBy.ASC;
  public DESK: OrderBy = OrderBy.DESC;

  public error: boolean = false;
  public addForm!: FormGroup;


  constructor(private readonly todoService: TodoService) { }

  public ngOnInit(): void {
    this.addForm = new FormGroup({
      text: new FormControl('', Validators.required)
    });
  }

  public addTodo(): void {
    if (!this.addForm.valid) {
      this.error = true;
      return;
    }
    const { text } = this.addForm.value;
    this.todoService.addTodo(text);
    this.addForm.reset();
  }
  
  public sortByCreatedDate(orderBy: OrderBy): void {
    this.todoService.getSortedTodosByCreatedDate(orderBy);
  }

  public sortByComleted(orderBy: OrderBy): void {
    this.todoService.getSortedTodosByCompleted(orderBy);
  }
}
