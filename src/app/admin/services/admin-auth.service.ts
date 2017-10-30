import {Injectable} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
@Injectable()
export class AdminAuthService extends AuthService {
  protected allowedUsers = [
    {username: 'Admin1', password: 'Admin1'},
    {username: 'Admin2', password: 'Admin2'},
    {username: 'Admin3', password: 'Admin3'},
  ];
}
