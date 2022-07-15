import { Injectable } from '@angular/core';
import { TasksService } from '../../shared/services/tasks.service';
import { IStatsData } from '../interfaces/stats-data.interface';
import { Task } from '../../shared/models/task.model';
import { Moment } from 'moment';
import { StatsModel } from '../models/stats.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { TSelectorDateFormat } from '../../shared/components/date/selector/types/selector-date-format.type';
import { TChartType } from '../components/chart/types/chart-type.type';


@Injectable()
export class StatsService {

  constructor(private readonly tasksService: TasksService) { }

  private _modelSubject$: BehaviorSubject<StatsModel> = new BehaviorSubject(new StatsModel());

  get model$(): Observable<StatsModel> {
    return this._modelSubject$.asObservable();
  }

  get model(): StatsModel {
    return this._modelSubject$.value;
  }

  set selectorDateFormat(selectorDateFormat: TSelectorDateFormat) {
    this._modelSubject$.next({ ...this.model, selectorDateFormat });
    this.updateData();
  }

  set chartType(chartType: TChartType) {
    this._modelSubject$.next({ ...this.model, chartType });
  }

  set date(date: Moment) {
    this._modelSubject$.next({ ...this.model, date });
    this.updateData();
  }

  private updateData(date: Moment = this.model.date): void {
    const data: IStatsData = this.getData(date);
    this._modelSubject$.next({ ...this.model, date, data });
  }

  private getData(date: Moment = this.model.date): IStatsData {
    return this.model.selectorDateFormat === 'MMMM YYYY' 
      ? this.getStatsForMonth(date) 
      : this.getStatsForDay(date);
  }

  private getStatsData(tasks: Task[]): IStatsData {
    const completed: number = tasks.filter((t: Task) => t.isCompleted).length;
    const uncompleted: number = tasks.length - completed;
    const val: number = completed / (completed + uncompleted) * 100;
    const progress: number = !Number.isNaN(val) ? parseFloat(val.toFixed(2)) : 0;

    return { completed, uncompleted, progress }
  }

  private getStatsForDay(date: Moment): IStatsData {
    const tasks: Task[] = this.tasksService.getTasksFromStorage(date.format('DD-MM-YYYY')).tasks;
    return this.getStatsData(tasks);
  }

  private getStatsForMonth(date: Moment): IStatsData {

    const startDay: Moment = date.clone().startOf('month');
    const endDay: Moment = date.clone().endOf('month');
    const currDate: Moment = startDay.clone();

    const tasks: Task[] = [];

    while (currDate.isBefore(endDay, 'day')) {
      tasks.push(...this.tasksService.getTasksFromStorage(currDate.format('DD-MM-YYYY')).tasks);
      currDate.add(1, 'day');
    }
    return this.getStatsData(tasks);
  }
}
