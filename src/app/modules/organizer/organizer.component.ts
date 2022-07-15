import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { Observable } from 'rxjs';
import { DateService } from 'src/app/modules/shared/services/date.service';


@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizerComponent implements OnInit {

  public date$!: Observable<Moment>;
  
  constructor(private readonly dateService: DateService) { }

  public ngOnInit(): void { 
    this.date$ = this.dateService.date$;
  }
}
