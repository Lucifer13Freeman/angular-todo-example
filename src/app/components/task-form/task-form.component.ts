import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { OrderBy } from 'src/app/enums/order-by.enum';
import { DateService } from 'src/app/services/date.service';
import { TasksService } from 'src/app/services/tasks.service';


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskFormComponent implements OnInit {

  public ASK: OrderBy = OrderBy.ASC;
  public DESK: OrderBy = OrderBy.DESC;

  @Input()
  public date: moment.Moment = moment();

  public error: boolean = false;
  public addForm!: FormGroup;

  constructor(private readonly tasksService: TasksService,
              private readonly dateService: DateService) { }

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
    const date: string = this.dateService.date.format('DD-MM-YYYY');
    const { text } = this.addForm.value;

    this.tasksService.addTask(text, date);
    this.addForm.reset();
  }
  
  public sortByCreatedDate(orderBy: OrderBy): void {
    const date: string = this.dateService.date.format('DD-MM-YYYY');
    this.tasksService.getSortedTasksByCreatedDate(date, orderBy);
  }

  public sortByComleted(orderBy: OrderBy): void {
    const date: string = this.dateService.date.format('DD-MM-YYYY');
    this.tasksService.getSortedTodosByCompleted(date, orderBy);
  }
}
