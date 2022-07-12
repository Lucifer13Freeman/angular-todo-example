import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from "@angular/core";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {
  
  @HostBinding('class.navbar-opened') 
  isOpened: boolean = false;
  
  constructor() { }
  
  ngOnInit() { }

  toggle() {
    this.isOpened = !this.isOpened;
  }
}