import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LOGIN_USER } from '../graphQL/mutations/login-user.mutation';
import { JwtService } from './jwt.service';
import { REFRESH_USER } from '../graphQL/queries/refresh-user.query';
import { HttpHeaders } from '@angular/common/http';
import { firstValueFrom, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apollo: Apollo, private jwtService: JwtService) {}

  loginUser(email: string, password: string) {
    this.apollo
      .mutate({
        mutation: LOGIN_USER,
        variables: {
          loginDetails: {
            email: email,
            password: password,
          },
        },
      })
      .subscribe((result) => {
        let response = result.data!.loginUser;
        this.jwtService.setToken(response.access_token);
        this.jwtService.setRefresh(response.refresh_token);
      });
  }

  refreshUserQuery() {
    return this.apollo.query({
      query: REFRESH_USER,
      context: {
        headers: new HttpHeaders().set(
          'Authorization',
          'Bearer ' + localStorage.getItem('refresh_token')
        ),
      },
    });
  }

  refreshUser() {
    this.refreshUserQuery().subscribe((result) => {
      let response = result.data!.refreshUser;
      localStorage.setItem('access_token', response.access_token);
    });
  }

  async isLoggedIn(): Promise<boolean> {
    if (!this.jwtService.isTokenExpired()) {
      return true;
    }
    if (this.jwtService.canRefreshToken()) {
      await firstValueFrom(this.refreshUserQuery());
    }
    return !this.jwtService.isTokenExpired();
  }

  async logoutUser() {
    this.jwtService.removeTokens();
    await this.apollo.client.resetStore().then();
  }
}
