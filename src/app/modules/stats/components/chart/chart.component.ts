import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { IStatsData } from '../../interfaces/stats-data.interface';
import { TChartType } from './types/chart-type.type';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  
  @ViewChild('chart')
  private chartRef!: ElementRef;
  private chart?: Chart;

  @Input()
  public data: IStatsData = { completed: 0, uncompleted: 0 }

  @Input()
  public type: TChartType = 'bar';

  constructor() { }

  public ngOnInit(): void {}
  
  public ngAfterViewInit(): void {
    this.getChart() 
  }

  public ngOnChanges(): void {
    this.getChart() 
  }

  public ngOnDestroy(): void {
    this.chart?.destroy();
  }
  
  private getChart(): void {

    this.chart?.destroy();

    const canvas: HTMLCanvasElement = this.chartRef?.nativeElement;

    if (!canvas) {
      return;
    }

    const data: any = {
      labels: [
        `Завершено ${this.data.completed}`,
        `Не завершено ${this.data.uncompleted}`
      ],
      datasets: [
        { 
          type: this.type,
          label: 'Прогресс',
          data: [
            this.data.completed, 
            this.data.uncompleted
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
      type: this.type,
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
        scales: {
          y: this.type === 'bar' ? {
            type: 'linear',
            title: {
              display: true,
              text: 'Задачи'
            },
            ticks: {
              stepSize: 1
            }
          } : undefined,
        }
      },
    });

    this.chart.update();
  }
}
