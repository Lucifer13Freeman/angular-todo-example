import * as moment from 'moment';
import { Observable } from "rxjs";
import { Task } from "./task.model";


export class TasksModel {
    public date!: moment.Moment;
    public tasks$!: Observable<Task[]>;
}