import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MomentPipe } from 'src/app/modules/shared/pipes/moment.pipe';
import { ErrorComponent } from './components/common/error/error.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { SelectorComponent } from './components/date/selector/selector.component';
import { TaskFormComponent } from './components/task/task-form/task-form.component';
import { TaskItemComponent } from './components/task/task-item/task-item.component';
import { TasksComponent } from './components/task/tasks/tasks.component';
import { CalendarComponent } from './components/date/calendar/calendar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DateService } from './services/date.service';
import { TasksService } from './services/tasks.service';
import { DropdownComponent } from './components/common/dropdown/dropdown.component';


@NgModule({
  declarations: [
    CalendarComponent,
    SelectorComponent,
    TaskFormComponent,
    TaskItemComponent,
    TasksComponent,
    ErrorComponent,
    NotFoundComponent,
    NavbarComponent,
    DropdownComponent,
    MomentPipe
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    CalendarComponent,
    SelectorComponent,
    TaskFormComponent,
    TaskItemComponent,
    TasksComponent,
    ErrorComponent,
    NotFoundComponent,
    NavbarComponent,
    DropdownComponent,
    MomentPipe
  ]
})
export class SharedModule { 
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        DateService,
        TasksService
      ],
    };
  }
}
