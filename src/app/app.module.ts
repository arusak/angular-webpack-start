import {NgModule, LOCALE_ID, APP_INITIALIZER} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {CoreModule} from "./core/core.module";
import {AppRoutingModule} from "./app-routing.module";
import {AdminAppModule} from "./admin/admin.module";
import {tmEnvConfig} from "../config/env.config";
import {APP_BASE_HREF} from "@angular/common";
import {UserAppModule} from "./user/user.module";
import {StartupService} from "./core/services/startup.service";

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
    {
      // https://stackoverflow.com/questions/41619443/how-to-call-an-rest-api-while-bootstrapping-angular-2-app
      provide: APP_INITIALIZER,
      useFactory: startupServiceFactory,
      deps: [StartupService],
      multi: true
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function startupServiceFactory(startupService: StartupService): Function {
  return () => startupService.initApp();
}
