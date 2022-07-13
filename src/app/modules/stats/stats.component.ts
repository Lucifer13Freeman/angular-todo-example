import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { Observable, tap } from 'rxjs';
import { SelectorTypeEnum } from '../shared/components/date/selector/enums/selector.enum';
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
  public chartType: TChartType = 'bar';
  public selectorType: SelectorTypeEnum = SelectorTypeEnum.DAY;

  constructor(private readonly dateService: DateService,
              private readonly statsService: StatsService) { }

  public ngOnInit(): void { 
    this.date$ = this.dateService.date$.pipe(
        tap((date: Moment) => this.data = this.statsService.getStats(date.format('DD-MM-YYYY'))
      )
    );
  }
}
