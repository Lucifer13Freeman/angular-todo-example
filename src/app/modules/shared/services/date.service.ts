import { Injectable } from "@angular/core";
import * as moment from "moment";
import { BehaviorSubject, Observable } from "rxjs";


@Injectable()
export class DateService 
{
    private dateSubject$: BehaviorSubject<moment.Moment> = new BehaviorSubject<moment.Moment>(moment());

    constructor() {}

    get date$(): Observable<moment.Moment> {
        return this.dateSubject$.asObservable();
    }

    get date(): moment.Moment {
        return this.dateSubject$.value;
    }

    public changeMonthByStep(step: number): void {
        const val: moment.Moment = this.dateSubject$.value.add(step, 'month');
        this.dateSubject$.next(val);
    }
    
    public changeDayByStep(step: number): void {
        const val: moment.Moment = this.dateSubject$.value.add(step, 'day');
        this.dateSubject$.next(val);
    }

    public changeDate(date: moment.Moment): void {
        const val: moment.Moment = this.dateSubject$.value.set({
            date: date.date(),
            month: date.month()
        });

        this.dateSubject$.next(val);
    }
}