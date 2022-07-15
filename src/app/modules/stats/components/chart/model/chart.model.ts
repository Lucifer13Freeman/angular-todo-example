import { IStatsData } from "../../../interfaces/stats-data.interface";
import { TChartType } from "../types/chart-type.type";


export class ChartModel {
    public data: IStatsData = { completed: 0, uncompleted: 0, progress: 0 };
    public type: TChartType = 'bar';
}