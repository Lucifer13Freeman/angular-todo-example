import * as moment from 'moment';

export interface IDay {
    value: moment.Moment;
    isActive: boolean;
    isDisabled: boolean;
    isSelected: boolean;
}