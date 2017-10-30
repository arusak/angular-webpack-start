import {Component} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
@Component({
  moduleId: module.id,
  selector: 'wp-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  username: string;
  password: string;
  message: string;

  constructor(private authService: AuthService) {
  }

  login() {
    this.authService.login(this.username, this.password).subscribe(result => {
      this.message = result ? 'Logged in successfully' : 'Login failed';
    });
  }
}
