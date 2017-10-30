import {Component} from '@angular/core';
import {AdminAuthService} from './services/admin-auth.service';
import {AuthService} from '../core/services/auth.service';
@Component({
  moduleId: module.id,
  selector: 'wp-app-admin',
  templateUrl: 'admin.app.component.html',
  styleUrls: ['admin.app.component.css'],
  providers: [
    {
      provide: AuthService,
      useClass: AdminAuthService
    }
  ]
})
export class AdminAppComponent {
}
