import {Component} from "@angular/core";

@Component({
  moduleId: module.id,
  selector: 'wp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
  appRoot: string;

  constructor() {
    this.appRoot = location.pathname;
  }
}
