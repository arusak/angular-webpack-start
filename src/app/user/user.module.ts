import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {UserAppComponent} from "./user.app.component";
import {UserRoutingModule} from "./user-routing.module";

import {SharedModule} from "../shared/shared.module";
import {UserAuthService} from './services/user-auth.service';
import {AuthService} from '../core/services/auth.service';
import {LoginComponent} from './components/login/login.component';

// end of imports -- не удаляйте эту строку, она нужна для работы задач галпа

@NgModule({
  imports: [
    UserRoutingModule,
    SharedModule,
    BrowserModule
  ],
  declarations: [
    UserAppComponent,
    LoginComponent,
  ],
  providers: [
    {
      provide: AuthService,
      useClass: UserAuthService
    }
  ]
})
export class UserAppModule {
}
