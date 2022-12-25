import {Injectable} from '@angular/core';
import {Apollo} from "apollo-angular";
import {LOGIN_USER} from "../graphQL/mutations/login-user.mutations";
import {JwtService} from "./jwt.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private apollo: Apollo,
    private jwtService: JwtService
  ) {
  }

  loginUser(email: string, password: string) {
    this.apollo.mutate({
      mutation: LOGIN_USER,
      variables: {
        loginDetails: {
          email: email,
          password: password
        }
      }
    }).subscribe((result) => {
      let response = result.data!.loginUser;
      this.jwtService.setToken(response.access_token);
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('refresh_token', response.refresh_token);
    })
  }
}
