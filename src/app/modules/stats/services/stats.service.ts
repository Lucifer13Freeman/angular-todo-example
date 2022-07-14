import { Injectable } from '@angular/core';
import { TasksService } from '../../shared/services/tasks.service';
import { IStatsData } from '../interfaces/stats-data.interface';
import { Task } from '../../shared/models/task.model';
import { Moment } from 'moment';


@Injectable()
export class StatsService {

  constructor(private readonly tasksService: TasksService) { }

  public getStatsForDay(date: Moment): IStatsData {
    const tasks: Task[] = this.tasksService.getTasksFromStorage(date.format('DD-MM-YYYY')).tasks;

    const completed: number = tasks.filter((t: Task) => t.isCompleted).length;
    const uncompleted: number = tasks.length - completed;

    return { completed, uncompleted }
  }

  public getStatsForMonth(date: Moment): IStatsData {

    const startDay: Moment = date.clone().startOf('month');
    const endDay: Moment = date.clone().endOf('month');
    const currDate: Moment = startDay.clone();

    const tasks: Task[] = [];

    while (currDate.isBefore(endDay, 'day')) {
      tasks.push(...this.tasksService.getTasksFromStorage(currDate.format('DD-MM-YYYY')).tasks);
      currDate.add(1, 'day');
    }

    const completed: number = tasks.filter((t: Task) => t.isCompleted).length;
    const uncompleted: number = tasks.length - completed;

    return { completed, uncompleted }
  }
}
