import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../../../../shared/services/auth.service';
import {ApolloModule} from 'apollo-angular';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ApolloModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  loginForm: FormGroup = this.formBuilder.group({
    email: ['123@123.com'],
    password: ['11111111'],
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
  }

  login() {
    this.authService.loginUser(
      this.loginForm.get('email')?.value,
      this.loginForm.get('password')?.value
    );
  }

  refresh() {
    this.authService.refreshUser();
  }

  logout() {
    this.authService.logoutUser().then(

    );
  }
}
