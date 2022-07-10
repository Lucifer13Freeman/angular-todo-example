import { ChangeDetectionStrategy, ChangeDetectorRef, 
        Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IWeek } from '../../interfaces/week.interface';
import { DateService } from '../../services/date.service';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit, OnDestroy {

  public date$!: Observable<moment.Moment>;
  public calendar: IWeek[] = [];
  private destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(private readonly dateService: DateService,
              private readonly changeDetector: ChangeDetectorRef) { }

  public ngOnInit(): void {
    this.getDate();
  }

  private getDate(): void {
    this.date$ = this.dateService.date$.pipe(
      takeUntil(this.destroyed$)
    );
    this.date$.subscribe({
      next: (date: moment.Moment) => {
        this.getMonth(date);
        this.changeDetector.detectChanges();
      }
    });
  }

  public getMonth(now: moment.Moment) {

    const startDay = now.clone().startOf('month').startOf('week');
    const endDay = now.clone().endOf('month').endOf('week');

    const date = startDay.clone().subtract(1, 'day');

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

      // days = [...days.slice(1), ...days.slice(0, 1)];

      calendar.push({ days } as unknown as IWeek);
    }

    this.calendar = calendar;
  }

  public select(day: moment.Moment) {
    this.dateService.changeDate(day);
  }

  public ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
