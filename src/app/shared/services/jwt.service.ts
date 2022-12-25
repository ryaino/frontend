import {Injectable} from '@angular/core';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  token: string = '';
  decodedToken: JWT | undefined;

  constructor() {
  }

  setToken(token: string) {
    if (token) {
      this.token = token;
    }
  }

  decodeToken() {
    let accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      this.setToken(accessToken)
    }
    if (this.token) {
      this.decodedToken = jwt_decode(this.token);
    }
  }

  getDecodedToken() {
    return jwt_decode(this.token);
  }

  getUser() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken["x-hasura-user-id"] : null;
  }

  getExpiryTime() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.exp : null;
  }

  isTokenExpired(): boolean {
    const expiryTime: number | null = this.getExpiryTime();

    if (expiryTime) {
      return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
    } else {
      return false;
    }
  }
}

type JWT = {
  "x-hasura-default-role": string,
  sub: string,
  iss: string,
  "x-hasura-user-id": string,
  exp: number,
  "x-hasura-allowed-roles": [string]

}
