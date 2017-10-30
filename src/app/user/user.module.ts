import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {UserAppComponent} from './user.app.component';
import {UserRoutingModule} from './user-routing.module';
import {SharedModule} from '../shared/shared.module';
import {LoginComponent} from './components/login/login.component';

@NgModule({
  imports: [
    UserRoutingModule,
    SharedModule,
    BrowserModule
  ],
  declarations: [
    UserAppComponent,
    LoginComponent,
  ]
})
export class UserAppModule {
}
