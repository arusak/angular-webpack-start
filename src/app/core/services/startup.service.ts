import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";

@Injectable()
export class StartupService {
  public initApp(): Promise<any> {
    this.setEnvironment();
    return Observable.empty().toPromise();
  }

  private setEnvironment() {
    let theme = this.getUrlParameter('theme');

    if (theme) {
      console.log('Setting the theme ' + theme);
      document.querySelector('body').classList.add('theme-' + theme);
    }
  }

  private getUrlParameter(name: string) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
  }
}
