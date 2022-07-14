import { ChangeDetectionStrategy, Component, 
        EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IDropdownItem } from './interfaces/dropdown-item.interface';


@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownComponent implements OnInit {

  selectedOption!: IDropdownItem;

  @Input()
  values: IDropdownItem[] = [];

  @Output()
  select: EventEmitter<IDropdownItem> = new EventEmitter<IDropdownItem>();

  constructor() { }

  public ngOnInit(): void { }

  public selectItem(event: any): void {
    console.log(event)
    // console.log((event.target as HTMLSelectElement).value)
    const value = event; //(event.target as HTMLSelectElement).value;
    this.select.emit(value as unknown as IDropdownItem);
  }
}
