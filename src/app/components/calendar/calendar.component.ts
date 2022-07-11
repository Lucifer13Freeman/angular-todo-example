import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Observable, tap } from 'rxjs';
import { IWeek } from '../../interfaces/week.interface';
import { DateService } from '../../services/date.service';


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

  public getMonth(now: moment.Moment) {

    const startDay: moment.Moment = now.clone().startOf('month').startOf('week');
    const endDay: moment.Moment = now.clone().endOf('month').endOf('week');

    const date: moment.Moment = startDay.clone().subtract(1, 'day');

    const calendar: IWeek[] = [];

    while (date.isBefore(endDay, 'day'))
    {
      let days = new Array(7).fill(0).map(() => {
        const value = date.add(1, 'day').clone();
        const isActive = moment().isSame(value, 'date');
        const isDisabled = !now.isSame(value, 'month');
        const isSelected = now.isSame(value, 'day');

        return { 
          value,
          isActive,
          isDisabled,
          isSelected
        }
      });

      calendar.push({ days } as unknown as IWeek);
    }

    this.calendar = calendar;
  }

  public select(day: moment.Moment) {
    this.dateService.changeDate(day);
  }
}
