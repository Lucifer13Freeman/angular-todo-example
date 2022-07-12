import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SelectorTypeEnum } from '../selector/enums/selector.enum';


@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatePickerComponent implements OnInit {

  public selectorType: SelectorTypeEnum = SelectorTypeEnum.MONTH;

  constructor() { }

  ngOnInit(): void { }
}
