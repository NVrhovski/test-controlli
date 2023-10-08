import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  @Input() showSidebar: boolean;
  @Output() hideSidebarEvent: EventEmitter<undefined>;

  constructor(){
    this.hideSidebarEvent = new EventEmitter()
  }

  hideSidebar(){
    this.hideSidebarEvent.emit()
  }
}
