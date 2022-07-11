import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

  private getTodos(): void {
    this.todos$ = this.todoService.todos$;
    this.todoService.getTodos();
  }
}
