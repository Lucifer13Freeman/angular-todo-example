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

    public changeMonth(step: number) {
        const val = this.dateSubject$.value.add(step, 'month');
        this.dateSubject$.next(val);
    }

    public changeDate(date: moment.Moment) {
        const val = this.dateSubject$.value.set({
            date: date.date(),
            month: date.month()
        });

        this.dateSubject$.next(val);
    }
}