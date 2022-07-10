import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DateService } from '../../services/date.service';


@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorComponent implements OnInit {

  date$!: Observable<moment.Moment>;

  constructor(private readonly dateService: DateService) { }

  ngOnInit(): void {
    this.date$ = this.dateService.date$;
  }

  public go(step: number) {
    this.dateService.changeMonth(step);
  }
}
