import { ChangeDetectionStrategy, Component, 
        ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { map, Observable } from 'rxjs';
import { StatsModel } from '../../models/stats.model';
import { StatsService } from '../../services/stats.service';
import { ChartModel } from './model/chart.model';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnInit, OnDestroy {
  
  @ViewChild('chart')
  private chartRef!: ElementRef;
  private chart?: Chart;

  public model$!: Observable<ChartModel>;
  public model!: ChartModel;

  constructor(private readonly statsService: StatsService) { }

  public ngOnInit(): void {
    this.initModel();
  }

  private initModel(): void {
    this.model$ = this.statsService.model$.pipe(
      map((model: StatsModel) => {
        const chartModel: ChartModel = {
          data: model.data,
          type: model.chartType
        }
        this.getChart(chartModel);
        this.model = chartModel;

        return chartModel;
      })
    );
  }
  
  public ngAfterViewInit(): void {
    this.getChart({
      data: this.model.data,
      type: this.model.type
    });
  }

  public ngOnDestroy(): void {
    this.chart?.destroy();
  }
  
  private getChart(model: ChartModel): void {

    this.chart?.destroy();

    const canvas: HTMLCanvasElement = this.chartRef?.nativeElement;

    if (!canvas) {
      return;
    }

    const data: any = {
      labels: [
        `Завершено ${model.data.completed}`,
        `Не завершено ${model.data.uncompleted}`
      ],
      datasets: [
        { 
          type: model.type,
          label: `Прогресс ${model.data.progress}%`,
          data: [
            model.data.completed, 
            model.data.uncompleted
          ],
          borderColor: "#8e5ea2",
          backgroundColor: [
            "#1fc8f8",
            "#d47c84"
          ],
          fill: true,
          borderRadius: 10,
        }
      ]
    };

    this.chart = new Chart(canvas, {
      type: model.type,
      data,
      options: {
        elements: {
          line: {
            borderJoinStyle: 'round'
          }
        },
        animation: {
          delay: 1,
          animateScale: true,
          animateRotate: true
        },
        responsive: true,
        scales: model.type === 'bar' ? {
          y: {
            type: 'linear',
            title: {
              display: true,
              text: 'Задачи'
            },
            ticks: {
              stepSize: 1
            }
          }
        } : undefined
      },
    });

    this.chart.update();
  }
}
