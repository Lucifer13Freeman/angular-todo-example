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
  
  @Input()
  options: IDropdownItem[] = [];

  @Output()
  select: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  public ngOnInit(): void { }

  public selectItem(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.select.emit(value);
    this.options.map((opt: IDropdownItem) => {
      if (opt.value === value) opt.selected = true;
      else opt.selected = false;
    });
  }
}
