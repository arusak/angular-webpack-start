import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user.model';
@Injectable()
export abstract class AuthService {
  protected abstract allowedUsers: User[];
  loggedIn: boolean;

  constructor() {
  }

  login(username: string, password: string): Observable<boolean> {
    let user = this.allowedUsers.find(user => user.username === username && user.password === password);
    this.loggedIn = !!user;
    return Observable.of(this.loggedIn);
  }

  logout() {
    this.loggedIn = false;
    return Observable.empty();
  }
}
