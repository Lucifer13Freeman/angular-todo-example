import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './components/date/calendar/calendar.component';
import { DatePickerComponent } from './components/date/date-picker/date-picker.component';
import { ErrorComponent } from './components/common/error/error.component';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { TaskFormComponent } from './components/task/task-form/task-form.component';
import { TaskItemComponent } from './components/task/task-item/task-item.component';
import { MomentPipe } from './pipes/moment.pipe';
import { DateService } from './services/date.service';
import { TasksService } from './services/tasks.service';
import { TasksComponent } from './components/task/tasks/tasks.component';
import { OrganizerComponent } from './components/pages/organizer/organizer.component';
import { TodoComponent } from './components/pages/todo/todo.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { SelectorComponent } from './components/date/selector/selector.component';


@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    SelectorComponent,
    DatePickerComponent,
    TaskFormComponent,
    TaskItemComponent,
    TodoComponent,
    TasksComponent,
    OrganizerComponent,
    ErrorComponent,
    NotFoundComponent,
    MomentPipe,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    DateService,
    TasksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
