import {Component} from "@angular/core";
import {Moment} from "moment";
import * as moment from "moment";

@Component({
  moduleId: module.id,
  selector: 'wp-app-user',
  templateUrl: 'user.app.component.html',
  styleUrls: ['user.app.component.css']
})
export class UserAppComponent {
  now: Moment;

  constructor() {
    this.now = moment();
  }
}
