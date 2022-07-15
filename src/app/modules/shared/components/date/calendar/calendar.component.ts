import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Observable, tap } from 'rxjs';
import { IDay } from 'src/app/modules/shared/components/date/calendar/interfaces/day.interface';
import { IWeek } from './interfaces/week.interface';
import { DateService } from '../../../services/date.service';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit {

  public date$!: Observable<moment.Moment>;
  public calendar: IWeek[] = [];

  constructor(private readonly dateService: DateService) { }

  public ngOnInit(): void {
    this.getDate();
  }

  private getDate(): void {
    this.date$ = this.dateService.date$.pipe(
      tap((date: moment.Moment) => this.getMonth(date))
    );
  }

  public getMonth(now: moment.Moment): void {

    const startDay: moment.Moment = now.clone().startOf('month').startOf('week');
    const endDay: moment.Moment = now.clone().endOf('month').endOf('week');

    const date: moment.Moment = startDay.clone().subtract(1, 'day');

    const calendar: IWeek[] = [];

    while (date.isBefore(endDay, 'day')) {

      let days: IDay[] = new Array(7).fill(0).map(() => {
        const value: moment.Moment = date.add(1, 'day').clone();
        const isActive: boolean = moment().isSame(value, 'date');
        const isDisabled: boolean = !now.isSame(value, 'month');
        const isSelected: boolean = now.isSame(value, 'day');

        return { 
          value,
          isActive,
          isDisabled,
          isSelected
        }
      });

      calendar.push({ days });
    }

    this.calendar = calendar;
  }

  public select(day: moment.Moment): void {
    this.dateService.changeDate(day);
  }
}
