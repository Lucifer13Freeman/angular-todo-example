import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsRoutingModule } from './stats-routing.module';
import { StatsComponent } from './stats.component';
import { SharedModule } from '../shared/shared.module';
import { DateService } from '../shared/services/date.service';
import { ChartComponent } from './components/chart/chart.component';
import { StatsService } from './services/stats.service';
import { TasksService } from '../shared/services/tasks.service';
import { ChartModelPipe } from './pipes/chart-model.pipe';


@NgModule({
  declarations: [
    StatsComponent,
    ChartComponent,
    ChartModelPipe
  ],
  imports: [
    CommonModule,
    StatsRoutingModule,
    SharedModule
  ],
  providers: [
    DateService,
    TasksService,
    StatsService
  ],
  bootstrap: [StatsComponent]
})
export class StatsModule { }
