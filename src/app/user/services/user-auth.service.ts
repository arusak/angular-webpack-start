import {Injectable} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
@Injectable()
export class UserAuthService extends AuthService {
  protected allowedUsers = [
    {username: 'User1', password: 'User1'},
    {username: 'User2', password: 'User2'},
    {username: 'User3', password: 'User3'},
  ];
}
