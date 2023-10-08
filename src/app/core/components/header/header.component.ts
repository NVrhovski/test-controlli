import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  showSidebar: boolean;

  constructor()
  {
    this.showSidebar = false;
  }

  handleShowSidebar(){
    this.showSidebar = true
  }

  handleHideSidebar(){
    this.showSidebar = false;
    console.log(this.showSidebar)
  }
}
