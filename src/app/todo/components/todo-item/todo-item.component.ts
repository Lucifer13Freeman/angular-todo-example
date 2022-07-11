import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit {

  @Input()
  public todo!: Todo;
  public isEditing: boolean = false;
  public editForm!: FormGroup;

  constructor(private readonly todoService: TodoService) { }

  public ngOnInit(): void { 
    this.editForm = new FormGroup({
      text: new FormControl('', Validators.required)
    });
  }

  public changeStatus(): void {
    this.todo.isCompleted = !this.todo.isCompleted;
    this.todoService.updateTodo(this.todo);
  }

  public editTodo(): void {
    this.isEditing = true;
    this.editForm.setValue({
      text: this.todo.text
    });
  }

  public submit(): void {
    const { text } = this.editForm.value;
    this.todo.text = text;
    this.todoService.updateTodo(this.todo);
    this.reset();
  }

  public reset(): void {
    this.isEditing = false;
    this.editForm.reset();
  }

  public removeTodo(): void {
    this.todoService.removeTodoById(this.todo.id);
  }
}
