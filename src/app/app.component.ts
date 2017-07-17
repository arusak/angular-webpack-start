import {Component, OnInit} from "@angular/core";
import {PageService} from "./core/services/page.service";
import {DomEventsService} from "./core/services/dom-events.service";

@Component({
  moduleId: module.id,
  selector: 'wp-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loading: boolean;

  constructor(private pageService: PageService, private domEvents: DomEventsService) {
  }

  ngOnInit() {
    this.pageService.hookTitlesToNavigation();

    this.pageService.watchPageLoading().subscribe(loading => this.loading = loading);

    this.domEvents.triggerOnDocument('appReady');
  }
}
