import {CoreModule} from "../core/core.module";
import {CapitalizePipe} from "./pipes/capitalize.pipe";
import {FormatDatePipe} from "./pipes/format-date.pipe";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgModule} from "@angular/core";
import {HeaderComponent} from "./header/header.component";
import {LogoComponent} from "./logo/logo.component";


// Do declare components, directives, and pipes in a shared module
// when those items will be re-used and referenced
// by the components declared in other feature modules.
@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    CoreModule,
    RouterModule,
    BrowserAnimationsModule,
  ],
  exports: [
    // Do export all symbols from the SharedModule that other feature modules need to use.
    // Avoid exporting providers
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule,

    CapitalizePipe,
    FormatDatePipe,

    HeaderComponent,
  ],
  declarations: [
    CapitalizePipe,
    FormatDatePipe,
    HeaderComponent,
    LogoComponent,
  ],
  providers: [
    // Do not provide services in shared modules. Services are usually
    // singletons that are provided once for the entire application
    // or in a particular feature module.
  ],
})
export class SharedModule {
}
