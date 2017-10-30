import {Component} from "@angular/core";
import {Moment} from "moment";
import * as moment from "moment";
import {UserAuthService} from './services/user-auth.service';
import {AuthService} from '../core/services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'wp-app-user',
  templateUrl: 'user.app.component.html',
  styleUrls: ['user.app.component.css'],
  providers: [
    {
      provide: AuthService,
      useClass: UserAuthService
    }
  ]
})
export class UserAppComponent {
  now: Moment;

  constructor() {
    this.now = moment();
  }
}
