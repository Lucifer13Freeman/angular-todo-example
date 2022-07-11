import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Observable, of, switchMap } from 'rxjs';
import { ITask } from '../../interfaces/task.interface';
import { DateService } from '../../services/date.service';
import { TasksService } from '../../services/tasks.service';
import { TasksModel } from './models/tasks.model';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  providers : [TasksService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksComponent implements OnInit {

  public form!: FormGroup;
  public model$!: Observable<TasksModel>;

  constructor(private readonly dateService: DateService,
              private readonly tasksService: TasksService) { }

  public ngOnInit(): void {

    this.form = new FormGroup({
      text: new FormControl('', Validators.required)
    });

    this.initModel();
  }

  private initModel() {

    const model: TasksModel = {
      date: this.dateService.date, 
      tasks$: this.dateService.date$
      .pipe(
        switchMap((date: moment.Moment) => this.tasksService.getTasks$(date))
      )
    }

    this.model$ = of(model);
  }

  public submit() {

    const { text } = this.form.value;
    const date: moment.Moment = this.dateService.date;

    const task: ITask = {
      text,
      date: date.format('DD-MM-YYYY')
    }

    this.tasksService.addTask(task);
    this.form.reset();
  }

  public remove(task: ITask) {
    this.tasksService.removeTask(task);
  }
}
