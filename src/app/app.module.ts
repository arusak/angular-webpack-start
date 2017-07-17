import {NgModule, LOCALE_ID} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {CoreModule} from "./core/core.module";
import {AppRoutingModule} from "./app-routing.module";
import {AdminAppModule} from "./admin/admin.module";
import {tmEnvConfig} from "../config/env.config";
import {APP_BASE_HREF} from "@angular/common";
import {UserAppModule} from "./user/user.module";

@NgModule({
  imports: [
    BrowserModule,

    CoreModule,

    UserAppModule,
    AdminAppModule,

    AppRoutingModule,
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: tmEnvConfig.webAppPrefix
    },
    {
      provide: LOCALE_ID,
      useValue: 'ru'
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
