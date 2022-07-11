import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DateService } from 'src/app/services/date.service';


@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizerComponent implements OnInit {

  constructor(private readonly dateService: DateService) { }

  public ngOnInit(): void { }
}
