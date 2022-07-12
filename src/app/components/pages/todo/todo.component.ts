import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SelectorTypeEnum } from '../../date/selector/enums/selector.enum';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent implements OnInit {

  public selectorType: SelectorTypeEnum = SelectorTypeEnum.DAY;

  constructor() { }

  public ngOnInit(): void { }
}
