import * as moment from 'moment';
import { IDropdownItem } from '../../shared/components/common/dropdown/interfaces/dropdown-item.interface';
import { TSelectorDateFormat } from '../../shared/components/date/selector/types/selector-date-format.type';
import { TChartType } from '../components/chart/types/chart-type.type';
import { IStatsData } from '../interfaces/stats-data.interface';

export class StatsModel {
  public date: moment.Moment = moment();
  public chartType: TChartType = 'bar';
  public data: IStatsData = { completed: 0, uncompleted: 0, progress: 0 };
  public selectorDateFormat: TSelectorDateFormat = 'MMMM YYYY';

  public readonly chartTypeOptions: IDropdownItem[] = [
    {
      label: 'Гистограмма',
      value: 'bar',
      selected: true,
    },
    {
      label: 'Круговая',
      value: 'pie',
      selected: false,
    },
    {
      label: 'Пончик',
      value: 'doughnut',
      selected: false,
    },
  ];
  public readonly selectorTypeOptions: IDropdownItem[] = [
    {
      label: 'За месяц',
      value: 'MMMM YYYY',
      selected: true,
    },
    {
      label: 'За день',
      value: 'DD.MM.YYYY',
      selected: false,
    },
  ];
}
