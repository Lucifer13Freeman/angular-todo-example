import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { map, Observable, of, Subject, Subscription, switchMap, takeUntil } from 'rxjs';
import { ITask } from '../../interfaces/task.interface';
import { DateService } from '../../services/date.service';
import { TasksService } from '../../services/tasks.service';
import { TasksModel } from './models/tasks.model';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksComponent implements OnInit {

  public form!: FormGroup;
  public date!: moment.Moment;
  // public tasks: ITask[] = [];

  public model$!: Observable<TasksModel>;
  // public model!: TasksModel;

  // public tasks$!: Observable<ITask[]>;
  // public date$!: Observable<moment.Moment>;
  // private destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(private readonly dateService: DateService,
              private readonly tasksService: TasksService) { }

  public ngOnInit(): void {

    this.form = new FormGroup({
      text: new FormControl('', Validators.required)
    });

    // this.getDate();
    // this.getTasks();
    this.initModel();
  }

  private initModel() {

    const model: TasksModel = {
      date$: this.dateService.date$, 
      tasks$: this.tasksService.tasks$
    }

    model.date$.pipe(
        // takeUntil(this.destroyed$),
      //   // switchMap(date => this.tasksService.getTasks(date))
    ).subscribe({
      next: (date: moment.Moment) => {
        this.date = date;
        this.tasksService.getTasks(this.date);
      }
    });

    // model.date$.pipe(
    //   takeUntil(this.destroyed$),
    //   switchMap(date => this.tasksService.getTasks$(date))
    // )
    // .subscribe({
    //   next: tasks => {
    //     this.tasks = tasks
    //   }
    // });

    // model.tasks$.subscribe((tasks) => console.log(tasks));

    this.model$ = of(model);
  }

  // private getTasks(): void {
  //   this.tasks$ = this.tasksService.tasks$;
  // }

  // private getDate(): void {
  //   this.dateService.date$.pipe(
  //     takeUntil(this.destroyed$),
  //     // switchMap(date => this.tasksService.getTasks(date))
  //   ).subscribe({
  //     next: (date: moment.Moment) => {
  //       this.date = date;
  //       this.tasksService.getTasks(date);
  //     }
  //   });
  // }

  // public ngOnDestroy(): void {
  //   this.destroyed$.next(true);
  //   this.destroyed$.complete();
  // }

  public submit() {

    const { text } = this.form.value;
    const date = this.date.format('DD-MM-YYYY');

    const task: ITask = {
      text,
      date
    }

    this.tasksService.addTask(task);
    this.form.reset();
  }

  public remove(task: ITask) {
    this.tasksService.removeTask(task);
  }
}
