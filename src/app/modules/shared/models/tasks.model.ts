import { Moment } from "moment";
import { Observable } from "rxjs";
import { Task } from "./task.model";


export class TasksModel {
    public date!: Moment;
    public tasks$!: Observable<Task[]>;
}