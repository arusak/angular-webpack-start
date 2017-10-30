import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AdminAppComponent} from './admin.app.component';
import {AdminRoutingModule} from './admin-routing.module';
import {SharedModule} from '../shared/shared.module';
import {AuthService} from '../core/services/auth.service';
import {AdminAuthService} from './services/admin-auth.service';
import {LoginComponent} from './components/login/login.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminAppComponent,
    LoginComponent,
  ],
  providers: [
    {
      provide: AuthService,
      useClass: AdminAuthService
    }
  ]
})
export class AdminAppModule {
}
