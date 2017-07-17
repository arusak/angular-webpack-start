import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AdminAppComponent} from "./admin.app.component";
import {AdminRoutingModule} from "./admin-routing.module";
import {SharedModule} from "../shared/shared.module";


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
  ],
  providers: [
  ]
})
export class AdminAppModule {
}
