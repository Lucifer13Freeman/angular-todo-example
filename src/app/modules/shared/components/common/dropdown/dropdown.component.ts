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
  options: IDropdownItem[] = [];

  @Input()
  title: string = '';

  @Output()
  select: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  public ngOnInit(): void { 
    this.title = this.options.length > 0 ? this.options[0].label : '';
  }

  public selectItem(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.select.emit(value);
  }
}
