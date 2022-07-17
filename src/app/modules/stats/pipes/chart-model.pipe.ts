import { Pipe, PipeTransform } from '@angular/core';
import { ChartModel } from '../components/chart/model/chart.model';
import { StatsModel } from '../models/stats.model';


@Pipe({
  name: 'chartModel'
})
export class ChartModelPipe implements PipeTransform {

  transform(value: StatsModel): ChartModel {
    return {
      data: value.data,
      type: value.chartType
    };
  }
}
