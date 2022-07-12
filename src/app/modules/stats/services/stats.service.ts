import { Injectable } from '@angular/core';
import { TasksService } from '../../shared/services/tasks.service';
import { IStatsData } from '../interfaces/stats-data.interface';
import { Task } from '../../shared/models/task.model';


@Injectable()
export class StatsService {

  constructor(private readonly tasksService: TasksService) { }

  public getStats(date: string): IStatsData {
    const tasks: Task[] = this.tasksService.getTasksFromStorage(date).tasks;

    const completed: number = tasks.filter((t: Task) => t.isCompleted).length;
    const uncompleted: number = tasks.length - completed;

    return { completed, uncompleted }
  }
}
