import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {UserAppComponent} from "./user.app.component";
import {UserRoutingModule} from "./user-routing.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    UserRoutingModule,
    SharedModule,
    BrowserModule
  ],
  declarations: [
    UserAppComponent,
  ],
  providers: []
})
export class UserAppModule {
}
