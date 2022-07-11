import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizerRoutingModule } from './organizer-routing.module';
import { OrganizerComponent } from './organizer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TasksComponent } from './components/tasks/tasks.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { SelectorComponent } from './components/selector/selector.component';
import { MomentPipe } from './pipes/moment.pipe';
import { DateService } from './services/date.service';


@NgModule({
  declarations: [
    OrganizerComponent,
    TasksComponent,
    CalendarComponent,
    SelectorComponent,
    MomentPipe
  ],
  imports: [
    CommonModule,
    OrganizerRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    DateService
  ],
  bootstrap: [
    OrganizerComponent
  ]
})
export class OrganizerModule { }
