import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { Observable } from 'rxjs';
import { DateService } from 'src/app/modules/shared/services/date.service';
import { SelectorTypeEnum } from '../shared/components/date/selector/enums/selector.enum';


@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizerComponent implements OnInit {

  public date$!: Observable<Moment>;
  public selectorType: SelectorTypeEnum = SelectorTypeEnum.MONTH;
  
  constructor(private readonly dateService: DateService) { }

  public ngOnInit(): void { 
    this.date$ = this.dateService.date$;
  }
}
