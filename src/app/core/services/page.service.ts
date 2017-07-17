import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import {Injectable} from "@angular/core";
import {Title} from "@angular/platform-browser";
import {
  ActivatedRoute,
  Router,
  NavigationEnd,
  NavigationStart,
  NavigationError,
  NavigationCancel
} from "@angular/router";
import {ConfigService} from "./config.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class PageService {
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private config: ConfigService,
              private titleService: Title) {
  }

  hookTitlesToNavigation() {
    this.router.events
    .filter(event => event instanceof NavigationEnd)
    .map(() => this.activatedRoute)
    .map(route => {
      while (route.firstChild) {
        route = route.firstChild;
      }
      return route;
    })
    .filter(route => route.outlet === 'primary')
    .mergeMap(route => route.data)
    .subscribe(event => {
      let title = [this.config.getAppTitle()];
      if (event['title']) {
        title.unshift(event['title']);
      }
      this.titleService.setTitle(title.join(' — '));
    });

  }

  watchPageLoading(): Observable<boolean> {
    return this.router.events
    .map(event => {
      if (event instanceof NavigationStart) {
        return true;
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        return false;
      }
    })
    .filter(isLoading => isLoading !== undefined)
    .distinctUntilChanged();
  }
}
