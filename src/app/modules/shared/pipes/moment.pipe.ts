import { Pipe, PipeTransform } from "@angular/core";
import { Moment } from "moment";


@Pipe({
    name: 'moment',
    pure: false
})
export class MomentPipe implements PipeTransform {
    transform(m: Moment | null, format: string = 'MMMM YYYY'): string {
        return m!.format(format);
    }
}