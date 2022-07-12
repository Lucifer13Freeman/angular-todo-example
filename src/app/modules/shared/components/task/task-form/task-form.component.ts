import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Moment } from 'moment';
import { SortOrderBy } from 'src/app/modules/shared/enums/sort-order-by.enum';
import { TasksService } from 'src/app/modules/shared/services/tasks.service';


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskFormComponent implements OnInit {

  public ASK: SortOrderBy = SortOrderBy.ASC;
  public DESK: SortOrderBy = SortOrderBy.DESC;

  @Input()
  public date!: Moment;

  public error: boolean = false;
  public addForm!: FormGroup;

  constructor(private readonly tasksService: TasksService) { }

  public ngOnInit(): void {
    this.addForm = new FormGroup({
      text: new FormControl('', Validators.required)
    });
  }

  public addTask(): void {
    if (!this.addForm.valid) {
      this.error = true;
      return;
    }
    const { text } = this.addForm.value;

    this.tasksService.addTask(text, this.date.format('DD-MM-YYYY'));
    this.addForm.reset();
  }
  
  public sortByCreatedDate(orderBy: SortOrderBy): void {
    this.tasksService.getSortedTasksByCreatedDate(this.date.format('DD-MM-YYYY'), orderBy);
  }

  public sortByComleted(orderBy: SortOrderBy): void {
    this.tasksService.getSortedTodosByCompleted(this.date.format('DD-MM-YYYY'), orderBy);
  }
}
