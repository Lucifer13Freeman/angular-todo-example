import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { Observable, tap } from 'rxjs';
import { IDropdownItem } from '../shared/components/common/dropdown/interfaces/dropdown-item.interface';
import { SelectorTypeEnum } from '../shared/components/date/selector/enums/selector.enum';
import { TSelectorDateFormat } from '../shared/components/date/selector/types/selector-date-format.type';
import { DateService } from '../shared/services/date.service';
import { TChartType } from './components/chart/types/chart-type.type';
import { IStatsData } from './interfaces/stats-data.interface';
import { StatsService } from './services/stats.service';


@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsComponent implements OnInit {

  public date$!: Observable<Moment>;
  public data: IStatsData = { completed: 0, uncompleted: 0 }
  
  public chartType: string = 'bar';
  public chartTypeSelector: IDropdownItem[] = [
    {
      label: 'Гистограмма',
      value: 'bar'
    },
    {
      label: 'Пирог',
      value: 'pie'
    },
    {
      label: 'Пончик',
      value: 'doughnut'
    }
  ];

  public selectorType: SelectorTypeEnum = SelectorTypeEnum.MONTH;
  public selectorDateFormat: TSelectorDateFormat = 'MMMM YYYY';

  constructor(private readonly dateService: DateService,
              private readonly statsService: StatsService) { }

  public ngOnInit(): void { 
    this.date$ = this.dateService.date$.pipe(
      tap((date: Moment) => {
        if (this.selectorType === SelectorTypeEnum.MONTH) {
          this.data = this.statsService.getStatsForMonth(date);
          this.selectorDateFormat = 'MMMM YYYY'
        } else {
          this.data = this.statsService.getStatsForDay(date);
          this.selectorDateFormat = 'DD.MM.YYYY'
        }
      })
    );
  }

  public changeChartType(event: IDropdownItem): void {
    // this.chartType = event.value as TChartType;
    console.log(event.value)
  }
}
