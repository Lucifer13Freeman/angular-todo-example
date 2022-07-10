import { ITask } from "src/app/organizer/interfaces/task.interface";
import * as moment from 'moment';
import { Observable } from "rxjs";

export class TasksModel {
    public date$!: Observable<moment.Moment>;
    public tasks$!: Observable<ITask[]>;
}