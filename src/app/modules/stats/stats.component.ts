import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { Observable, switchMap } from 'rxjs';
import { TSelectorDateFormat } from '../shared/components/date/selector/types/selector-date-format.type';
import { DateService } from '../shared/services/date.service';
import { TChartType } from './components/chart/types/chart-type.type';
import { StatsModel } from './models/stats.model';
import { StatsService } from './services/stats.service';


@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsComponent implements OnInit {

  public model$!: Observable<StatsModel>;

  constructor(private readonly dateService: DateService,
              private readonly statsService: StatsService) { }

  public ngOnInit(): void { 
    this.initModel();
  }

  private initModel(): void {
    this.model$ = this.dateService.date$.pipe(
      switchMap((date: Moment) => {
        this.statsService.date = date;
        return this.statsService.model$;
      }) 
    );
  }

  public changeChartType(value: string): void {
    const chartType = value as TChartType;
    this.statsService.chartType = chartType;
  }
  
  public changeSelectorType(value: string): void {
    const selectorDateFormat = value as TSelectorDateFormat;
    this.statsService.selectorDateFormat = selectorDateFormat;
  }
}
