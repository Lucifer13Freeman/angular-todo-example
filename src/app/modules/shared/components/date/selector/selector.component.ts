import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { Observable } from 'rxjs';
import { DateService } from 'src/app/modules/shared/services/date.service';
import { TSelectorDateFormat } from './types/selector-date-format.type';


@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorComponent implements OnInit {

  @Input()
  public format: TSelectorDateFormat = 'MMMM YYYY';

  public date$!: Observable<Moment>;

  constructor(private readonly dateService: DateService) { }

  public ngOnInit(): void {
    this.date$ = this.dateService.date$;
  }

  public go(step: number): void {
    this.format === 'MMMM YYYY' 
      ? this.dateService.changeMonthByStep(step) 
      : this.dateService.changeDayByStep(step);
  }
}
