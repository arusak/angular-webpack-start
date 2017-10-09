import {NgModule} from "@angular/core";
import {Logger} from "./services/logger.service";
import {BrowserModule} from "@angular/platform-browser";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {DomEventsService} from "./services/dom-events.service";
import {PageService} from "./services/page.service";
import {ConfigService} from "./services/config.service";
import {StartupService} from "./services/startup.service";

@NgModule({
  imports: [
    // Do import all modules required by the assets in the CoreModule
    BrowserModule
  ],
  declarations: [
    PageNotFoundComponent,
  ],
  exports: [
    PageNotFoundComponent,
  ],
  providers: [
    // Do put a singleton service whose instance will be shared throughout the application in the CoreModule
    Logger,
    PageService,
    DomEventsService,
    ConfigService,
    StartupService,
  ]
})
export class CoreModule {
}
