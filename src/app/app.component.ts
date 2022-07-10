import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'to-do';

  public ngOnInit(): void {
    moment.updateLocale('en', {
      week: {
        dow: 1
      }
    });
  }
}
