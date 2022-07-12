import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Observable, of, switchMap } from 'rxjs';
import { DateService } from '../../../services/date.service';
import { TasksService } from '../../../services/tasks.service';
import { TasksModel } from '../../../models/tasks.model';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksComponent implements OnInit {

  public model$!: Observable<TasksModel>;

  constructor(private readonly dateService: DateService,
              private readonly tasksService: TasksService) { }

  public ngOnInit(): void {
    this.initModel();
  }

  private initModel(): void {

    const model: TasksModel = {
      date: this.dateService.date, 
      tasks$: this.dateService.date$.pipe(
        switchMap((date: moment.Moment) => this.tasksService.getTasks$(date))
      )
    }

    this.model$ = of(model);
  }
}
