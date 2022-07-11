import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DateService } from 'src/app/services/date.service';
import { SelectorTypeEnum } from './enums/selector.enum';


@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorComponent implements OnInit {

  @Input()
  public type: SelectorTypeEnum = SelectorTypeEnum.MONTH;

  @Input()
  public format: string = 'MMMM YYYY';

  public date$!: Observable<moment.Moment>;

  constructor(private readonly dateService: DateService) { }

  public ngOnInit(): void {
    this.date$ = this.dateService.date$;
  }

  public go(step: number): void {
    this.type === SelectorTypeEnum.MONTH 
      ? this.dateService.changeMonthByStep(step) 
      : this.dateService.changeDayByStep(step);
  }
}
